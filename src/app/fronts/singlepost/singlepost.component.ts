import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faComment, faEye } from '@fortawesome/free-regular-svg-icons';
import { data } from 'jquery';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentsService } from 'src/app/services/comments.service';

var md5=require("blueimp-md5");

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.css','../../layouts/front/front.component.css']
})
export class SinglepostComponent implements OnInit {
  blogSlug : string = "";
  newsId:any;
  blogList:any;
  blogDetails:any;
  listPopularBlogs:any;
  tags:any = [];
  alltags:any;
  tagCloud : string = '';
  tagCloudArray : string[] = [];
  i:number=1;
  comments:any = [];
  lastComments:any;
  oldViews:number=0;

  //fontawesome
  facebook=faFacebookF;
  twitter=faTwitter;
  pin=faPinterestP
  com = faComment
  eye = faEye

  //comments
  addCommentForm:FormGroup=new FormGroup({});

  //spinner
  saving:boolean=false;
  saved:boolean=false;

  objPatch!:Blog;

  //gravarar pic
  email:string='';

  constructor(private blogservice:BlogService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private commentService:CommentsService,
    private title:Title) {
      //this.title.setTitle("Single Post");
    }

  getCommenterPic(email:string){
    return "https://gravatar.com/avatar/"+md5(email);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x=>{
      this.blogSlug=x.slug;
    })

    this.blogservice.viewPost(this.blogSlug).subscribe(x=>{
      this.blogDetails=x;
      this.oldViews=this.blogDetails.views;
      //related posts
      this.blogservice.listBlogsByCat(this.blogDetails.category.categoryName).subscribe(a=>{
        this.blogList=a;
      })

      //popular posts
      this.blogservice.listPopularPosts().subscribe(p=>{
        this.listPopularBlogs=p;
      })

      //tag clouds
      this.blogservice.listBlogs().subscribe(t=>{
        this.alltags=t;
        this.alltags.forEach((a: any) => {
          this.i++;
          this.tagCloud += a.tags;
          if(this.i <= this.alltags.length){
            this.tagCloud += ',';
          }
        });
        this.tagCloudArray=this.tagCloud.split(',').map(item => item).filter((value, index, self) => self.indexOf(value) === index);

      })

      //last comments
      this.commentService.listCommentsDesc().subscribe(c=>{
        console.log(c);
        this.lastComments=c;
      })

      this.newsId=this.blogDetails.newsId;
      this.tags=this.blogDetails.tags.split(',')
      this.commentService.listCommentsByPost(this.blogDetails.newsId).subscribe(c=>{
        console.log(c);
        this.comments = c;
      });
      this.title.setTitle(this.blogDetails.title);

      //update view
      let fd = new FormData();
      const data1 = {
        newsId: this.blogDetails.newsId,
        title: this.blogDetails.title,
        views: this.oldViews+1,
        slug: this.blogDetails.slug,
        tags: this.blogDetails.tags,
        body: this.blogDetails.body,
        imageName: this.blogDetails.imageName,
        extImageName:null,
        categoryId: this.blogDetails.category.categoryId,
        reporterId: this.blogDetails.author.reporterId,
        availability: this.blogDetails.availability,
        createdAt: this.blogDetails.createdAt,
        updatedAt: this.blogDetails.updatedAt,
      };

      fd.append("newsId", data1.newsId);
      fd.append("title", data1.title);
      fd.append("views", String(data1.views));
      fd.append("slug", data1.slug);
      fd.append("tags", data1.tags);
      fd.append("body", data1.body);
      fd.append("imageName", data1.imageName);
      fd.append("extImageName",data1.imageName);
      fd.append("categoryId", data1.categoryId);
      fd.append("reporterId", data1.reporterId);
      fd.append("availability", data1.availability);
      fd.append("createdAt", data1.createdAt);
      fd.append("updatedAt", data1.updatedAt);

      //console.log(data1);
      this.blogservice.editPost(data1.newsId, fd).subscribe(data=>{

        console.log("Data saved");

      },err=>{
        console.log(err);
      })

    },err=>{
      console.log(err);
    });

    //comment form
    const date = new Date();
    this.addCommentForm=this.formBuilder.group({
      'Author' : new FormControl('',Validators.required),
      'Email' : new FormControl('',Validators.required),
      'CommentContent' : new FormControl('',[Validators.required,Validators.minLength(20)]),
      'CommentDate': new FormControl(date.toISOString().substring(0,10)),
    });


  }
  createComment(){
    this.saving=true;
    const data = {
      author: this.addCommentForm.value["Author"],
      email: this.addCommentForm.value["Email"],
      CommentContent: this.addCommentForm.value["CommentContent"],
      CommentDate: this.addCommentForm.value["CommentDate"],
      newsId: this.newsId,
    };
    //console.log(data);
    setTimeout(() => {
      this.commentService.postComment(data).subscribe(data=>{
        this.addCommentForm.reset({});
        this.saving=false;
        this.saved=true;
        window.location.reload();
      },err=>{
        console.log(err);
      })
    }, 2000);
  }
  NumCeil(c:any){
    return Math.ceil(c);
  }

}
