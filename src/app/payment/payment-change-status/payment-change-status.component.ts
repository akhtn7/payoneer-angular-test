import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PaymentListComponent } from '../payment-list/payment-list.component';
import { PaymentService } from '../payment.service';
import { PaymentChangeStatusRequest } from '../entities/payment-change-status-request.model';
import { PaymentChangeStatusResult } from '../entities/payment-change-status-result.enum';
import { PaymentChangeStatusResponse } from '../entities/payment-change-status-response.model';

@Component({
  selector: 'app-payment-change-status',
  templateUrl: './payment-change-status.component.html',
  styleUrls: ['./payment-change-status.component.css']
})
export class PaymentChangeStatusComponent {

  constructor(
    private paymentListService: PaymentService,
    public dialogRef: MatDialogRef<PaymentListComponent>,
    @Inject(MAT_DIALOG_DATA
    ) public data: PaymentChangeStatusRequest
  ) { }

  onSave(): void {
    this.paymentListService.updatePaymentStatus(this.data).subscribe(
      (response: PaymentChangeStatusResponse) => {
        console.log('response:', response);

        if (response.result === PaymentChangeStatusResult.ok) {
          this.dialogRef.close(this.data);
          return;
        }

        alert(response.message);
      },
      error => {
        console.log('error:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
