import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  blogId : string = "";
  blogDetails:any;

  constructor(private blogservice:BlogService,private activatedRoute:ActivatedRoute,private title:Title) { }

  ngOnInit(): void {
     this.activatedRoute.params.subscribe(x=>{
      this.blogId=x.id;
    })
    this.blogservice.viewPost(this.blogId).subscribe(x=>{
      this.blogDetails=x;
      this.title.setTitle(this.blogDetails.title);
    })
  }

}
