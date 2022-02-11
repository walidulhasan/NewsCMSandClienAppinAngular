import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthorService } from 'src/app/services/author.service';
import { BlogService } from 'src/app/services/blog.service';

var md5=require("blueimp-md5");

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css','../../layouts/front/front.component.css']
})
export class AuthorComponent implements OnInit {

  authorName:any;
  postsByAuthor : any;
  authorDetails:any;
  showLoading:boolean=true;
  showLoadingPosts:boolean=false;

  //fontawesome
  share=faShareAlt;
  facebook=faFacebookF;
  twitter=faTwitter;
  pin=faPinterestP

  constructor(private activatedRoute:ActivatedRoute,
    private blogservice:BlogService,
    private authorservice:AuthorService) { }

  getCommenterPic(email:string){
    return "https://gravatar.com/avatar/"+md5(email);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x=>{
      this.authorName=x.authorName;
      setTimeout(() => {
        this.authorservice.authorByName(this.authorName).subscribe(a=>{
          this.authorDetails=a;
          console
        })
        this.showLoading=false;
        this.showLoadingPosts=true;
        setTimeout(() => {
          this.blogservice.listBlogsByAutor(this.authorName).subscribe(x=>{
            this.postsByAuthor=x;
            this.showLoadingPosts=false;
          })
        }, 1000);
      }, 1000);

    })
  }
  NumCeil(c:any){
    return Math.ceil(c);
  }
}
