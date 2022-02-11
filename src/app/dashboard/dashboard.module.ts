import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AuthorsComponent } from './authors/authors.component';
import { CategoriesComponent } from './categories/categories.component';
import { DologinComponent } from './dologin/dologin.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { SpecialityComponent } from './speciality/speciality.component';
import { PollComponent } from './poll/poll.component';
import { ReportingComponent } from './reporting/reporting.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ComputerComponent } from './computer/computer.component';
import { MailsendingComponent } from './mailsending/mailsending.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { RssComponent } from './rss/rss.component';
import { CountryComponent } from './country/country.component';
import { DesignationComponent } from './designation/designation.component';
import { GenderComponent } from './gender/gender.component';
import { MediaComponent } from './media/media.component';
import { PlaceComponent } from './place/place.component';
import { SettingsComponent } from './settings/settings.component';
import { PollListComponent } from './poll-list/poll-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatDialogModule} from '@angular/material/dialog';
import { CommentssComponent } from './commentss/commentss.component';







@NgModule({
  declarations: [
    HomeComponent,
    CreatePostComponent,
    ListPostComponent,
    UpdatePostComponent,
    AuthorsComponent,
    CategoriesComponent,
    DologinComponent,
    SubCategoryComponent,
    SpecialityComponent,
    PollComponent,
    ReportingComponent,
    ManageUserComponent,
    ComputerComponent,
    MailsendingComponent,
    AdminprofileComponent,
    RssComponent,
    CountryComponent,
    DesignationComponent,
    GenderComponent,
    MediaComponent,
    PlaceComponent,
    SettingsComponent,
    PollListComponent,
    CommentssComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSortModule,
    NgxChartsModule,
    FormsModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule,
    CKEditorModule
  ]
})
export class DashboardsModule { }
