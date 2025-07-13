import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('type'); 
    const expectedRoles = route.data['roles'] as Array<string>; 

    if (!token || !userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!expectedRoles.includes(userRole)) {
      if (userRole === 'Admin') {
        this.router.navigate(['/admin/dashboard']); 
      } else if (userRole === 'User') {
        this.router.navigate(['/user/dashboard']); 
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }

    return true;
  }
}
