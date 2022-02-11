import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {
  baseUrl:string = 'http://localhost:20245/api/';
  constructor(private http:HttpClient) { }
  listComputers(){
    return this.http.get(this.baseUrl+'specialities');
  }
  addComputers(obj:any){
    return this.http.post(this.baseUrl+'specialities', obj)
  }
  ComputersUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'specialities/'+id, obj)
  }
  ComputersById(id:any){
    return this.http.get(this.baseUrl+'specialities/'+id);
  }
  deleteComputers(id:any){
    return this.http.delete(this.baseUrl+'specialities/'+id)
  }
}
