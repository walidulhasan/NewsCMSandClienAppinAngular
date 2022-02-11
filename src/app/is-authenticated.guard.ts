import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router){

  }

  canActivate( ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedin$.pipe(
      tap(isLoggedin => {
        if (!isLoggedin) {
          this.router.navigate(['dashboard/login']);
        }
      })
    );

  }

}
