import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
var md5=require("blueimp-md5");

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  token:any;
  authorDetails:any;

  constructor(private authorService: AuthorService,private router:Router) { }

  ngOnInit(): void {
    this.getU();
  }

  getU(){
    this.token = localStorage.getItem('Mahmud_auth');
    if(this.token){
      this.authorService.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
        this.authorDetails=x;
      })
    }
  }
  getCommenterPic(){
    return "#"+md5(this.authorDetails?.email);
  }

  //logout
  logout(){
    localStorage.removeItem('Mahmud_auth');
    window.location.href="/dashboard/login";
  }

}
