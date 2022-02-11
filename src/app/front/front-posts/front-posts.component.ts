import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-front-posts',
  templateUrl: './front-posts.component.html',
  styleUrls: ['./front-posts.component.css']
})
export class FrontPostsComponent implements OnInit {
  blogId : string = "";
  blogDetails:any;
  listBlogs:any;
  searchTerm: any;
  term: any;

  constructor(private activatedRoute:ActivatedRoute,
    private blogservice:BlogService,
    private title:Title) {
      this.title.setTitle("Mahmud's Blog");
     }

  ngOnInit(): void {
    this.blogservice.listBlogs().subscribe(data => {
      this.listBlogs = data;
      console.log(data);
    });
    // this.activatedRoute.params.subscribe(x=>{
    //   this.blogId=x.id;
    // })
    // this.blogservice.viewPost(this.blogId).subscribe(x=>{
    //   this.blogDetails=x;
    // })
  }

}
