import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PaymentListComponent } from '../payment-list/payment-list.component';
import { PaymentService } from '../payment.service';
import { PaymentChangeStatusRequest } from '../entities/payment-change-status-request.model';

@Component({
  selector: 'app-payment-change-status',
  templateUrl: './payment-change-status.component.html',
  styleUrls: ['./payment-change-status.component.css']
})
export class PaymentChangeStatusComponent implements OnInit {

  constructor(
    private paymentListService: PaymentService,
    public dialogRef: MatDialogRef<PaymentListComponent>,
    @Inject(MAT_DIALOG_DATA
    ) public data: PaymentChangeStatusRequest
  ) { }

  ngOnInit() {
  }

  onSave(): void {
    this.paymentListService.updatePaymentStatus(this.data).subscribe(x => {
      console.log(x);
      this.dialogRef.close(this.data);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
