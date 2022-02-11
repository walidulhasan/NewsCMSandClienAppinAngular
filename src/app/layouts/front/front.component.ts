import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { faFacebookF,faPinterestP,faTwitter,faYoutube } from '@fortawesome/free-brands-svg-icons';
import { BlogService } from 'src/app/services/blog.service';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  //fontawesome
  facebook=faFacebookF;
  youtube=faYoutube;
  share = faShareAlt;
  twitter=faTwitter;
  pin=faPinterestP;

  //tags cloud
  alltags:any;
  tagCloud : string = '';
  tagCloudArray : string[] = [];
  i:number=1;
  tt:any;

  catList:any;
  listblog:any;
  catTitle : string = "";
  currentUrl:any;
  currentHome:any;

  constructor(private catService:CategoryService,
    private blogservice:BlogService,
    private title:Title,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.catService.listCategories().subscribe(data=>{
      this.catList=data;
      this.title.setTitle('FUSE News');
      console.log(this.router.url);
      this.currentHome=this.router.url;
      this.currentUrl = this.router.url.substring(10);
    });
    this.blogservice.listBlogs().subscribe(b=>{
      this.listblog=b;

      //tag clouds
      this.alltags=b;
      this.alltags.forEach((a: any) => {
        this.i++;
        this.tagCloud += a.tags;
        if(this.i <= this.alltags.length){
          this.tagCloud += ',';
        }
      });
      this.tagCloudArray=this.tagCloud.split(',').map(item => item).filter((value, index, self) => self.indexOf(value) === index);;
      console.log(this.tagCloudArray);

    });
  }

}
