import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router
) { }
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  let currentUser = JSON.parse(localStorage.getItem('user'))
  if (currentUser) {
      // logged in so return true
      if(currentUser.token){
        return true;
      }
     
  }

  // not logged in so redirect to login page with the return url
  this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
}

}
