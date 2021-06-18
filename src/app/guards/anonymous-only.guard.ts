import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/general/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousOnlyGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!this.userService.IsLoggedIn()) { return true; }

    //this.router.navigate(['404']);
    //setTimeout(() => this.location.replaceState(state.url));

    // Redirect to the login page
    //return this.router.parseUrl('/pos');

    this.router.navigateByUrl('/pos', {replaceUrl: true});
    return false;
  }
  
}
