import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.css']
})
export class PollListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   //Tabil Data Filter
  //  applyFilter($event:any){
  //   this.dataSource.filter=$event.target.value;
  // }

}
