import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from 'src/app/services/author.service';
var md5=require("blueimp-md5");


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  token:any;
  authorDetails:any;
  ipAddress = '';
  myDate: any = new Date();
  constructor(private authorService: AuthorService,private router:Router,private http:HttpClient,private datePipe: DatePipe) {

   }

  ngOnInit(): void {
    this.getU();
    this.getIPAddress();
    this.getDateTime();
  }

  getU(){
    this.token = localStorage.getItem('Mahmud_auth');
    console.log(this.token);
    if(this.token){
      this.authorService.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
        this.authorDetails=x;
      })
    }
  }
  getCommenterPic(){
    return "#"+md5(this.authorDetails?.email);
  }
  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
      console.log(this.ipAddress);
    });
  }
  getDateTime(){
    this.myDate = this.datePipe.transform(this.myDate,'dd/MM/yyyy');
  }


}
