import { Component, OnInit } from '@angular/core';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-mailsending',
  templateUrl: './mailsending.component.html',
  styleUrls: ['./mailsending.component.css']
})
export class MailsendingComponent implements OnInit {
  listStaff : any;

  constructor(private authorService:AuthorService) { }

  ngOnInit(): void {
    this.GetStaff();
  }
//category ID
GetStaff(){
  this.authorService.listAuthors().subscribe(data => {
    this.listStaff = data;
  });
}
}
