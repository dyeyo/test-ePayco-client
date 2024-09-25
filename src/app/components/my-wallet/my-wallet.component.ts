import { CommonModule } from '@angular/common';
import { WalletService } from './../../services/wallet.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-wallet',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './my-wallet.component.html',
  styleUrl: './my-wallet.component.css',
})
export class MyWalletComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  walletService = inject(WalletService);
  formRecharge: FormGroup | any;
  balance: number = 0;

  ngOnInit(): void {
    this.loadBalance();
    this.createForm();
  }

  createForm() {
    this.formRecharge = this.formBuilder.group({
      document: ['', Validators.required],
      cellphone: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  submitRecharge() {
    const payload: any = this.formRecharge.value;
    this.walletService.rechargeWallet(payload).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Recarga realizada',
          text: 'La recarga se realizo con exito',
          icon: 'success',
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
            cancelButton:
              'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
          },
        });
        this.formRecharge.reset();
        this.loadBalance();
        console.log('Regsitro completado');
      },
      error: (error) => {
        Swal.fire({
          title: 'Error a hacer el pago',
          text: 'Algo va mal, intentelo mas tarde',
          icon: 'error',
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
            cancelButton:
              'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
          },
        });
        console.error('Error al registar:', error);
      },
      complete: () => {
        console.log('Regsitro completado');
      },
    });
  }

  loadBalance() {
    const userLocal:any = localStorage.getItem('user')
    const user:any = JSON.parse(userLocal);
    const payload = {
      document: user.document,
      cellphone: user.cellphone,
    };
    console.log(payload);
    this.walletService.myBalance(payload).subscribe({
      next: (data: any) => {
        this.balance = data.response.balance;
      },
      error: (error) => {
        Swal.fire({
          title: 'Error a hacer el pago',
          text: 'Algo va mal, intentelo mas tarde',
          icon: 'error',
          customClass: {
            confirmButton:
              'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded px-4 py-2',
            cancelButton:
              'bg-gray-300 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 rounded px-4 py-2',
          },
        });
        console.error('Error al registar:', error);
      },
    });
  }
}
