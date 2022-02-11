import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css','../../layouts/front/front.component.css']
})
export class TagComponent implements OnInit {

  tagName : string = "";
  postsByTag : any;
  showLoading:boolean=true

  //fontawesome
  share=faShareAlt;
  facebook=faFacebookF;
  twitter=faTwitter;
  pin=faPinterestP

  constructor(private activatedRoute:ActivatedRoute,
    private blogservice:BlogService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x=>{
      this.tagName=x.tag;
      setTimeout(() => {
        this.blogservice.listBlogsByTag(this.tagName).subscribe(x=>{
          this.postsByTag=x;
          this.showLoading=false;
        })
      }, 1500);
    })
  }
  NumCeil(c:any){
    return Math.ceil(c);
  }

}
