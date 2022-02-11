import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {
  baseUrl:string = 'http://localhost:20245/api/';
  constructor(private http:HttpClient) { }
  listComputers(){
    return this.http.get(this.baseUrl+'designations');
  }
  addComputers(obj:any){
    return this.http.post(this.baseUrl+'designations', obj)
  }
  ComputersUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'designations/'+id, obj)
  }
  ComputersById(id:any){
    return this.http.get(this.baseUrl+'designations/'+id);
  }
  deleteComputers(id:any){
    return this.http.delete(this.baseUrl+'designations/'+id)
  }
}
