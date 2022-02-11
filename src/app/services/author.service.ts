import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUrl:string = 'http://localhost:20245/api/';

  constructor(private http:HttpClient) { }

  listAuthors(){
    return this.http.get(this.baseUrl+'reporters');
  }
  addAuthor(blogObj:any){
    return this.http.post(this.baseUrl+'reporters',blogObj);
  }
  authorByName(name:string){
    return this.http.get(this.baseUrl+'reporters/ByName/'+name);
  }
  authorById(id:number){
    return this.http.get(this.baseUrl+'reporters/'+id);
  }
  authorUpdateBy(id:any, blogObj:any){
    return this.http.put(this.baseUrl+'reporters/'+id, blogObj);
  }
}
