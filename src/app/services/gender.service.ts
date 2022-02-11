import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  baseUrl:string = 'http://localhost:20245/api/';
  constructor(private http:HttpClient) { }
  listComputers(){
    return this.http.get(this.baseUrl+'genders');
  }
  addComputers(obj:any){
    return this.http.post(this.baseUrl+'genders', obj)
  }
  ComputersUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'genders/'+id, obj)
  }
  ComputersById(id:any){
    return this.http.get(this.baseUrl+'genders/'+id);
  }
  deleteComputers(id:any){
    return this.http.delete(this.baseUrl+'genders/'+id)
  }
}
