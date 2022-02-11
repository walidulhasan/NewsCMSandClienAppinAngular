import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  baseUrl:string = 'http://localhost:20245/api/';
  constructor(private http:HttpClient) { }
  listPlace(){
    return this.http.get(this.baseUrl+'places');
  }
  addPlace(obj:any){
    return this.http.post(this.baseUrl+'places', obj)
  }
  PlaceUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'places/'+id, obj)
  }
  PlaceById(id:any){
    return this.http.get(this.baseUrl+'places/'+id);
  }
  deletePlace(id:any){
    return this.http.delete(this.baseUrl+'places/'+id)
  }
}
