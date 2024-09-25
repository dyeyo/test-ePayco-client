import { IUsers } from './../interfaces/IUsers';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<string | null>(this.getUser());
  constructor(private http: HttpClient) {}

  register(payload: IUsers) {
    return this.http.post(`${environment.url}users/register`, payload).pipe(
      tap((data: any) => {
        const user = {
          document: payload.document,
          cellphone: payload.cellphone,
        };
        this.setToken(user);
      })
    );
    return this.http.post(`${environment.url}users/register`,payload);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  getUserObservable() {
    return this.userSubject.asObservable();
  }

  setToken(user: any) {
    localStorage.setItem('user',  JSON.stringify(user)); 
    this.userSubject.next(user);
  }
}
