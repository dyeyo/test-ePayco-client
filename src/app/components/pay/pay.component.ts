import { WalletService } from './../../services/wallet.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css',
})
export class PayComponent {
  formBuilder = inject(FormBuilder);
  walletService = inject(WalletService);
  router = inject(Router);
  formPay: FormGroup | any;
  formValid = true;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formPay = this.formBuilder.group({
      document: ['', Validators.required],
      cellphone: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  submitPay() {
    const payload: any = this.formPay.value;
    if (this.formPay.valid) {
      this.formValid = true;
    }
    this.walletService.sendPay(payload).subscribe({
      next: (data: any) => {
        Swal.fire({
          title: 'Pago pendiente',
          text: 'Se envio al correo un codigo para confirmar el pago',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
            cancelButton:
              'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem('session', data.response.session_id);
            this.router.navigate(['/confirm']);
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      },
      error: (error) => {
        Swal.fire({
          title: "Error a hacer el pago",
          text: "Algo va mal, intentelo mas tarde",
          icon: "error"
        });
      },
    });
  }
}
