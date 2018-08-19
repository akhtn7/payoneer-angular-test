import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from './entities/payment.model';
import { PaymentChangeStatusRequest } from './entities/payment-change-status-request.model';
import { PaymentChangeStatusResult } from './entities/payment-change-status-result.enum';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  getPayments(query: string): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(`/api/payments${query}`);
  }

  getPayment(paymentId: number): Observable<Payment> {
    return this.httpClient.get<Payment>(`/api/payments/${paymentId}`);
  }

  updatePaymentStatus(request: PaymentChangeStatusRequest): Observable<any> {
    return this.httpClient.put<PaymentChangeStatusRequest>(`/api/payments/${request.id}`, request);
  }
}
