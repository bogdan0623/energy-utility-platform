import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, public auth: SharedService) {}

  public href:string="";

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let url: string = state.url;
      return this.checkUserLogin(route, url);
    // if(this.auth.isAdminLoggedIn()) {
    //   // this.router.navigate(['/admin']);
    //   return this.auth.isUserLoggedIn();
    // }
    // return this.auth.isUserLoggedIn();
    //return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if(this.auth.isLoggedIn()){
      const userRole = this.auth.getRole();
      if(route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/login']);
        return false;
      }
      console.log(this.auth.getToken());
      if(this.auth.getRole() === 'user' && this.router.url !== '/login'){
        console.log(this.router.url);
        this.href = this.router.url;
        this.href = this.href.split("/", 3)[2];
        console.log(this.href);
        const user_id = this.auth.getUserId();        
        if(this.href !== user_id){
          console.log("AICI");
          this.router.navigate(['/login']);
          return false;
        }
      }
      return true;
    }

    this.router.navigate['/login'];
    return false;
  }
  
}
