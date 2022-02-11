import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  panelOpenState = false;
  token: any;
  authorDetails: any;
  role:string="";

  constructor(private authorService:AuthorService,private auth:AuthService) { }

  ngOnInit(): void {
    this.getU();
  }

  getU(){
    this.token = localStorage.getItem('Mahmud_auth');
    if(this.token){
      this.authorService.authorById(JSON.parse(atob(this.token.split('.')[1]))["iss"]).subscribe(x=>{
        this.authorDetails=x;
        console.log(this.authorDetails);
        this.role=this.authorDetails.role;
      })
    }
  }

}
