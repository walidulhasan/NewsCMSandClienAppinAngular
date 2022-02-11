import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminsComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {

  }


}
