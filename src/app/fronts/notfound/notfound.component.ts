import { Component, OnInit } from '@angular/core';
import { PreviousrouteService } from '../../services/previousroute.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  backUrl:any;

  constructor(private previousRouteService: PreviousrouteService) {
  }

  ngOnInit(): void {
    this.backUrl=this.previousRouteService.getPreviousUrl();
  }

}
