import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceCookieService } from './service-cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  isAuthenticate: boolean = false;
  constructor(private cookieService: ServiceCookieService, private router: Router) {
    let isExistAuth = this.cookieService.getCookie("isAuth");
    console.warn(typeof isExistAuth);

    if (typeof isExistAuth != undefined && isExistAuth != "") {
      this.isAuthenticate = true
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAuthenticate) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }

}
