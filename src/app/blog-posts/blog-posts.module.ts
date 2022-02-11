import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListsComponent } from './blog-lists/blog-lists.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DeletePostComponent } from './delete-post/delete-post.component';
import {MatTableModule} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewPostComponent } from './view-post/view-post.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdminComponent } from './admin/admin.component'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    BlogListsComponent,
    AddPostComponent,
    EditPostComponent,
    DeletePostComponent,
    ViewPostComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class BlogPostsModule { }
