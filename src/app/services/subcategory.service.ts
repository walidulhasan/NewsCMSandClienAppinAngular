import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  baseUrl:string = 'http://localhost:20245/api/';

  constructor(private http:HttpClient) { }
  listsubCategories(){
    return this.http.get(this.baseUrl+'subCategories');
  }
  addsubCat(obj:any){
    return this.http.post(this.baseUrl+'subCategories', obj)
  }
  subcatUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'subCategories/'+id, obj)
  }
  subCatById(id:number){
    return this.http.get(this.baseUrl+'subCategories/'+id);
  }
  deletesubCat(id:any){
    return this.http.delete(this.baseUrl+'subCategories/'+id)
  }
}
