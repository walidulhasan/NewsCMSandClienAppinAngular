import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedin$ = new BehaviorSubject<boolean>(false);
  isLoggedin$ = this._isLoggedin$.asObservable();

  constructor(private http:HttpClient) {
    const token = localStorage.getItem("Mahmud_auth");
    this._isLoggedin$.next(!!token);
  }

  login(authorObj:any){
    return this.http.post('http://localhost:20245/api/Auth/login',authorObj,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).pipe(
      tap((r:any)=>{
        localStorage.setItem("Mahmud_auth", r.token);
        this._isLoggedin$.next(true);
      })
    );
  }
}
