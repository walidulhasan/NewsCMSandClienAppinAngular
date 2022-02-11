import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from './layout/layout.module';

//search
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { FrontPostsComponent } from './front/front-posts/front-posts.component';


import { FormsModule } from '@angular/forms';
import { AdminsComponent } from './layouts/admin/admin.component';
import { FrontComponent } from './layouts/front/front.component';
import { FrontsModule } from './fronts/fronts.module';
import { DashboardsModule } from './dashboard/dashboard.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InterceptorService } from './services/interceptor.service';
import { CustomstyleDirective } from './customstyle.directive';
import { MatIconModule } from '@angular/material/icon';


//fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    AppComponent,
    FrontPostsComponent,
    AdminsComponent,
    FrontComponent,
    CustomstyleDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    LayoutModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    BlogPostsModule,
    FormsModule,
    FrontsModule,
    DashboardsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FontAwesomeModule

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
