import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  users: string = "" 

  ngOnInit(): void {
    this.authService.getUserObservable().subscribe((user:any) => {
      this.users = user;
    });
  }

  logout(){
    localStorage.clear()
    this.authService.getUserObservable().subscribe((user:any) => {
      this.users = "";
    });
    this.router.navigate(['/']);
  }
}
