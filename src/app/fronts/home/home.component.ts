import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { CommentsService } from 'src/app/services/comments.service';
import { LoaderService } from 'src/app/services/loader.service';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';

var md5=require("blueimp-md5");

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../layouts/front/front.component.css']
})
export class FrontsHomeComponent implements OnInit {
  blogId : string = "";
  blogDetails:any;
  listBlogs:any;
  listPopularBlogs:any;
  searchTerm: any;
  term: any;
  showLoader:boolean=true;
  comments:any;

  //gravarar pic
  email:string='';
  loadingGravatar:boolean=true;


  //fontawesome
  share=faShareAlt;
  facebook=faFacebookF;
  twitter=faTwitter;
  pin=faPinterestP

  constructor(private activatedRoute:ActivatedRoute,
    private blogservice:BlogService,
    private title:Title,
    private commentService:CommentsService,
    public loadService:LoaderService) {
      this.title.setTitle("IsDB-BISEW Blog");
    }

    getCommenterPic(email:string){
      return "https://gravatar.com/avatar/"+md5(email);
    }

  ngOnInit(): void {
    this.blogservice.listBlogs().subscribe(data => {
      this.listBlogs = data;
      this.showLoader=false;
    });
    this.blogservice.listPopularPosts().subscribe(p=>{
      this.listPopularBlogs=p;
    })
    this.commentService.listCommentsDesc().subscribe(c=>{
      this.comments=c;
    })
  };
  NumCeil(c:any){
    return Math.ceil(c);
  }

}
