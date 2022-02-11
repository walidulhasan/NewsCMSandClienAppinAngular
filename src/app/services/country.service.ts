import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl:string = 'http://localhost:20245/api/';
  constructor(private http:HttpClient) { }
  listComputers(){
    return this.http.get(this.baseUrl+'countries');
  }
  addComputers(obj:any){
    return this.http.post(this.baseUrl+'countries', obj)
  }
  ComputersUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'countries/'+id, obj)
  }
  ComputersById(id:any){
    return this.http.get(this.baseUrl+'countries/'+id);
  }
  deleteComputers(id:any){
    return this.http.delete(this.baseUrl+'countries/'+id)
  }
}
