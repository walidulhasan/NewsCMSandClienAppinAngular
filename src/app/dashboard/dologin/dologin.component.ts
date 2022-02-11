import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dologin',
  templateUrl: './dologin.component.html',
  styleUrls: ['./dologin.component.css']
})
export class DologinComponent implements OnInit {

  invalidLogin:boolean=false;

  constructor(private route:Router,
    private http:HttpClient,
    private authService:AuthService,
    private title:Title) {
      this.title.setTitle("User Login");
     }

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.authService.login(credentials).subscribe(response => {
      this.invalidLogin = false;
      this.route.navigate(["/dashboard"]);
    }, err => {
      this.invalidLogin = true;
    });



  }
  ngOnInit(): void {
    if(localStorage.getItem('Mahmud_auth') != null){
      this.route.navigate(["/dashboard"]);
    }
  }

}
