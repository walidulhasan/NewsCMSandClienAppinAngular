import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../models/blog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl:string = 'http://localhost:20245/api/';

  constructor(private http:HttpClient) { }

  listBlogs(){
    return this.http.get(this.baseUrl+'news');
  }
  listBlogsBack(){
    return this.http.get(this.baseUrl+'news/Filter2/Back');
  }
  listBlogsByCat(cat:string){
    return this.http.get(this.baseUrl+'news/filter/'+cat)
  }
  listBlogsByTag(tag:string){
    return this.http.get(this.baseUrl+'news/tags/'+tag)
  }
  addPost(blogObj:any){
    return this.http.post(this.baseUrl+'news',blogObj);
  }
  editPost(id:any, blogObj:any){
    return this.http.put(this.baseUrl+'news/'+id, blogObj);
  }
  deletePost(id:any){
    return this.http.delete(this.baseUrl+'news/'+id)
  }
  viewPost(id:string){
    return this.http.get(this.baseUrl+'news/'+id)
  }
  listPopularPosts(){
    return this.http.get(this.baseUrl+'news/popular')
  }
  listBlogsByAutor(name:string){
    return this.http.get(this.baseUrl+'news/reporter/'+name)
  }
  listBlogsByAutorId(id:any){
    return this.http.get(this.baseUrl+'news/ByReporterId/'+id)
  }
}
