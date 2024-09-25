import { WalletService } from './../../services/wallet.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css',
})
export class ConfirmComponent {
  formBuilder = inject(FormBuilder);
  walletService = inject(WalletService);
  router = inject(Router);
  formConfirm: FormGroup | any;
  formValid = true;

  ngOnInit(): void {
    this.createForm();
    this.setIDSession();
  }

  createForm() {
    this.formConfirm = this.formBuilder.group({
      session_id: ['', Validators.required],
      token: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  setIDSession(){
    const idSession:any = localStorage.getItem("session");
    this.formConfirm.get('session_id').value=idSession
  }

  submitConfirm() {
    const payload: any = this.formConfirm.value;
    if (this.formConfirm.valid) {
      this.formValid = true;
    }
    this.walletService.confirmPay(payload).subscribe({
      next: (data) => {
        Swal.fire({
          title: "Pago realizado",
          text: "El pago de realizo con exito",
          icon: "success",
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
            cancelButton:
              'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
          },

        });
        this.router.navigate(['/']);

      },
      error: (error) => {
        Swal.fire({
          title: "Error a hacer el pago",
          text: "Algo va mal, intentelo mas tarde",
          icon: "error"
        });
        console.error('Error al registar:', error);
      },
    });
  }
}
