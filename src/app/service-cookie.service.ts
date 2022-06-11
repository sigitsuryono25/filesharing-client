import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ServiceCookieService {

  constructor(private cookieService: CookieService) { }


  getCookie(key: any) {
    return this.cookieService.get(key);
  }

  setCookie(key: any, value: any) {
    this.cookieService.set(key, value);
  }

  removeCookie() {
    this.cookieService.deleteAll();
    window.location.reload();
  }

}
