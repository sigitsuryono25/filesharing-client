import { Component } from '@angular/core';
import { ServiceCookieService } from './service-cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timeline-client';
  isAuthenticate: boolean = false;

  constructor(private cookieService: ServiceCookieService) {
    let isAuth = this.cookieService.getCookie('isAuth');
    console.warn(typeof isAuth);

    if (typeof isAuth != undefined && isAuth != "") {
      this.isAuthenticate = true
    }
  }

  logout(){
    this.cookieService.removeCookie();
  }
}
