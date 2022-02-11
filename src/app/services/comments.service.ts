import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  baseUrl:string = 'http://localhost:20245/api/';

  constructor(private http:HttpClient) { }

  listCommentsDesc(){
    return this.http.get(this.baseUrl+'comments');
  }
  listCommentsByPost(id:number){
    return this.http.get(this.baseUrl+'comments/'+id);
  }
  postComment(blogObj:any){
    return this.http.post(this.baseUrl+'comments',blogObj);
  }

  commentDelete(id:any){
    return this.http.delete(this.baseUrl+'comments/'+id)
  }

}
