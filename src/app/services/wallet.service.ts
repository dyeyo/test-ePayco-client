import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {}

  myBalance(payload: any) {
    return this.http.post(`${environment.url}wallet/check-balance`,payload);
  }

  rechargeWallet(payload: any) {
    return this.http.post(`${environment.url}wallet/recharge-wallet`,payload);
  }

  sendPay(payload: any) {
    return this.http.post(`${environment.url}wallet/generate-token`,payload);
  }

  confirmPay(payload: any) {
    return this.http.post(`${environment.url}wallet/confirm-payment`,payload);
  }
}
