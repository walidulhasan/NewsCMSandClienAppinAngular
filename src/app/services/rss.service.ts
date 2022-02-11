import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  baseUrl:string = 'http://localhost:20245/api/';

  constructor(private http:HttpClient) { }
  listsubCategories(){
    return this.http.get(this.baseUrl+'rsses');
  }
  addsubCat(obj:any){
    return this.http.post(this.baseUrl+'rsses', obj)
  }
  subcatUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'rsses/'+id, obj)
  }
  subCatById(id:number){
    return this.http.get(this.baseUrl+'rsses/'+id);
  }
  deletesubCat(id:any){
    return this.http.delete(this.baseUrl+'rsses/'+id)
  }
}
