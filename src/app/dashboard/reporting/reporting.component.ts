import { Component, OnInit } from '@angular/core';
import { single } from './pieGrid';
import { table } from './tableChart';
import{piechart} from './pieChart';
import{linechart} from './lineChart';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  single=[];
  table=[];
  view:[number,number] = [1000, 600];
  view1:[number,number] = [900, 500];
  linechart=[];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    Object.assign(this, { single });
    Object.assign(this, { table });
    Object.assign(this, { piechart });
    Object.assign(this, { linechart });
  }

   onSelect(event: any) {
     console.log(event);
  }

  ngOnInit(): void {

  }
   // options table
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegends = true;
   showXAxisLabel = true;
   xAxisLabel = 'Country';
   showYAxisLabel = true;
   yAxisLabel = 'Population';
   // options piechart
  gradients: boolean = true;
  showLegendss: boolean = true;
  showLabelss: boolean = true;
  isDoughnuts: boolean = false;

   onSelects(data:any): void {
     console.log('Item clicked', JSON.parse(JSON.stringify(data)));
   }

   onActivate(data:any): void {
     console.log('Activate', JSON.parse(JSON.stringify(data)));
   }

   onDeactivate(data:any): void {
     console.log('Deactivate', JSON.parse(JSON.stringify(data)));
   }

   // options
  legend: boolean = true;
  showLabel1: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel1: boolean = true;
  showXAxisLabel1: boolean = true;
  xAxisLabel1: string = 'Year';
  yAxisLabel1: string = 'Population';
  timeline: boolean = true;

  onSelectss(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivates(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivates(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
