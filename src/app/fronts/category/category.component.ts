import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css','../../layouts/front/front.component.css']
})
export class CategoryComponent implements OnInit {
  catTitle : string = "";
  postsByCat : any;
  showLoading:boolean=true;

  //fontawesome
  share=faShareAlt;
  facebook=faFacebookF;
  twitter=faTwitter;
  pin=faPinterestP

  constructor(private activatedRoute:ActivatedRoute,
    private blogservice:BlogService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(x=>{
      this.catTitle=x.title;
      setTimeout(() => {
        this.blogservice.listBlogsByCat(this.catTitle).subscribe(x=>{
          this.postsByCat=x;
          this.showLoading=false;
        })
      }, 1500);
    })
  }
  NumCeil(c:any){
    return Math.ceil(c);
  }

}
