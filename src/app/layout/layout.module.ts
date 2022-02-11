import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { CustomstyleDirective } from '../customstyle.directive';
import { ColorgreenDirective } from './head/colorgreen.directive';
import {MatMenuModule} from '@angular/material/menu';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeadComponent,
    SidebarComponent,
    ColorgreenDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    RouterModule
  ],
  exports:[
    HeadComponent,
    SidebarComponent
  ]
})
export class LayoutModule { }
