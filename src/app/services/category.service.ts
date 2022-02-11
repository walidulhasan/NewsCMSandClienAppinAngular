import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl:string = 'http://localhost:20245/api/';

  constructor(private http:HttpClient) { }

  listCategories(){
    return this.http.get(this.baseUrl+'categories');
  }
  addCat(obj:any){
    return this.http.post(this.baseUrl+'categories', obj)
  }
  catUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'categories/'+id, obj)
  }
  CatById(id:number){
    return this.http.get(this.baseUrl+'categories/'+id);
  }
  deleteCat(id:any){
    return this.http.delete(this.baseUrl+'categories/'+id)
  }


}
