import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '../is-authenticated.guard';
import { AuthorsComponent } from './authors/authors.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { DologinComponent } from './dologin/dologin.component';
import { HomeComponent } from './home/home.component';
import { ListPostComponent } from './list-post/list-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
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
import { PlaceComponent } from './place/place.component';
import { SettingsComponent } from './settings/settings.component';
import { PollListComponent } from './poll-list/poll-list.component';
import { CommentssComponent } from './commentss/commentss.component';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'blog/list',
    component : ListPostComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'blog/create',
    component : CreatePostComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'blog/edit/:id',
    component : UpdatePostComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'Staff',
    component : AuthorsComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'cats',
    component : CategoriesComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path : 'login',
    component : DologinComponent
  },
  {
    path:'subcategory',
    component:SubCategoryComponent,
  },
  {
    path:'newsSpeciality',
    component:SpecialityComponent
  },
  {
    path:'poll',
    component:PollComponent
  },
  {
    path:'pollList',
    component:PollListComponent
  },
  {
    path:'reporting',
    component:ReportingComponent
  },
  {
    path:'manageuser',
    component:ManageUserComponent
  },
  {
    path:'computer',
    component:ComputerComponent
  },
  {
    path:'mailsending',
    component:MailsendingComponent
  },
  {
    path:'adminprofile',
    component:AdminprofileComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path:'rss',
    component:RssComponent,
    canActivate:[IsAuthenticatedGuard]
  },
  {
    path:'country',
    component:CountryComponent
  },
  {
    path:'designation',
    component:DesignationComponent
  },
  {
    path:'gender',
    component:GenderComponent
  },
  {
    path:'place',
    component:PlaceComponent
  },
  {
    path:'setting',
    component:SettingsComponent
  },
  {
    path:'comm',
    component:CommentssComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
