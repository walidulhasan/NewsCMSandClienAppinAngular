import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './blog-posts/add-post/add-post.component';
import { AdminComponent } from './blog-posts/admin/admin.component';
import { BlogListsComponent } from './blog-posts/blog-lists/blog-lists.component';
import { DeletePostComponent } from './blog-posts/delete-post/delete-post.component';
import { EditPostComponent } from './blog-posts/edit-post/edit-post.component';
import { ViewPostComponent } from './blog-posts/view-post/view-post.component';
import { FrontPostsComponent } from './front/front-posts/front-posts.component';
import { NotfoundComponent } from './fronts/notfound/notfound.component';
import { AdminsComponent } from './layouts/admin/admin.component';
import { FrontComponent } from './layouts/front/front.component';

const routes: Routes = [
  {
    path : '',
    component:FrontComponent,
    children : [
        {
          path : '',
          loadChildren : () => import('./fronts/fronts.module').then(m=>m.FrontsModule)
        }
    ]
  },
  {
    path : '',
    component : AdminsComponent,
    children : [
      {
        path : '',
        redirectTo : '/dashboard',
        pathMatch : 'full',
      },
      {
        path : 'dashboard',
        loadChildren : () => import('./dashboard/dashboard.module').then(d=>d.DashboardsModule)
      }
    ]
  },
  {
    path:'**',
    pathMatch:'full',
    component: NotfoundComponent
  }
  // {path: 'admin',
  //   children:[
  //     {path:'',component:AdminComponent},
  //     {path:'blog/create',component:AddPostComponent},
  //     {path:'blog/edit/:id',component:EditPostComponent},
  //     {path:'blog/list',component:BlogListsComponent},
  //     {path:'blog/delete/:id',component:DeletePostComponent},
  //     {path:'authors',component:AuthorsComponent},
  //   ]
  // },
  // {path: 'front',
  //   children:[
  //     {path:'',component:FrontPostsComponent},
  //     {path:'view/:id',component:ViewPostComponent},
  //   ]
  // },
  // {path:'',redirectTo:'front',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
