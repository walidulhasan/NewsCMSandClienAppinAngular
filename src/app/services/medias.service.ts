import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediasService {
  baseUrl:string = 'http://localhost:20245/api/';
  constructor(private http:HttpClient) { }
  listComputers(){
    return this.http.get(this.baseUrl+'media');
  }
  addComputers(obj:any){
    return this.http.post(this.baseUrl+'media', obj)
  }
  ComputersUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'media/'+id, obj)
  }
  ComputersById(id:any){
    return this.http.get(this.baseUrl+'media/'+id);
  }
  deleteComputers(id:any){
    return this.http.delete(this.baseUrl+'media/'+id)
  }
}
