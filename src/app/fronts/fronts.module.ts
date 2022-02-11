import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontsRoutingModule } from './fronts-routing.module';
import { FrontsHomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { MatCardModule } from '@angular/material/card';
import { CategoryComponent } from './category/category.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { TagComponent } from './tag/tag.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthorComponent } from './author/author.component';



@NgModule({
  declarations: [
    FrontsHomeComponent,
    SinglepostComponent,
    CategoryComponent,
    TagComponent,
    NotfoundComponent,
    AuthorComponent
  ],
  imports: [
    CommonModule,
    FrontsRoutingModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    FontAwesomeModule
  ]
})
export class FrontsModule { }
