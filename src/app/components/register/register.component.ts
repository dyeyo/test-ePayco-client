import { IUsers } from './../../interfaces/IUsers';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from './../../services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  formRegister: FormGroup | any;
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formRegister = this.formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(149),
          Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
        ],
      ],
      document: ['', Validators.required],
      cellphone: ['', Validators.required],
    });
  }

  submitRegister() {
    const payload: IUsers = this.formRegister.value;
    this.authService.register(payload).subscribe({
      next: (data) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al registar:', error);
        Swal.fire({
          title: 'Error a hacer el pago',
          text: 'Algo va mal, intentelo mas tarde',
          icon: 'error',
        });
      },
      complete: () => {
        console.log('Regsitro completado');
        this.router.navigate(['/home']);
      },
    });
  }
}
