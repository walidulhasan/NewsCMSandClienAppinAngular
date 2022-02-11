import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { CategoryComponent } from './category/category.component';
import { FrontsHomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SinglepostComponent } from './singlepost/singlepost.component';
import { TagComponent } from './tag/tag.component';

const routes: Routes = [
  {
    path:'',
    component:FrontsHomeComponent
  },
  {
    path:'post/:slug',
    component:SinglepostComponent
  },
  {
    path:'category/:title',
    component:CategoryComponent
  },
  {
    path:'tags/:tag',
    component:TagComponent
  },
  {
    path:'author/:authorName',
    component:AuthorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontsRoutingModule { }
