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
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
      alert('Please log in first.');
      this.router.navigate(['/login']);
      return false;
    }

    const expectedRole = route.data['role'];
    if (expectedRole && user.role !== expectedRole) {
      alert('Access denied');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
