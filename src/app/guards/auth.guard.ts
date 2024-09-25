import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const user = localStorage.getItem('user');

    if (user) {
      return true; 
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}