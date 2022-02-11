import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {
  baseUrl:string = 'http://localhost:20245/api/';
  constructor(private http:HttpClient) { }
  listComputers(){
    return this.http.get(this.baseUrl+'computers');
  }
  addComputers(obj:any){
    return this.http.post(this.baseUrl+'computers', obj)
  }
  ComputersUpdateBy(id:number,obj:any){
    return this.http.put(this.baseUrl + 'computers/'+id, obj)
  }
  ComputersById(id:any){
    return this.http.get(this.baseUrl+'computers/'+id);
  }
  deleteComputers(id:any){
    return this.http.delete(this.baseUrl+'computers/'+id)
  }
}



