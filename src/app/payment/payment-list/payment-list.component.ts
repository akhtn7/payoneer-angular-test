import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { Payment } from '../entities/payment.model';
import { PaymentService } from '../payment.service';
import { PaymentChangeStatusComponent } from '../payment-change-status/payment-change-status.component';
import { PaymentChangeStatusRequest } from '../entities/payment-change-status-request.model';

class FilterStatus {
  pending = true;
  approved = true;
  rejected = true;
}

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  displayedColumns = ['paymentDate', 'status', 'amount', 'reason', 'changeStatus'];
  dataSource = new MatTableDataSource<Payment>();
  filterStatus = new FilterStatus();

  constructor(
    private paymentListService: PaymentService,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log('ngOnInit', this.filterStatus);
    this.getPayments();
  }

  onFilterStatusChanged() {
    console.log('onStatusChanged', this.filterStatus);
    this.getPayments();
  }

  onChangeStatus(paymentId) {
    this.paymentListService.getPayment(paymentId).subscribe(item => {

      const paymentChangeStatusRequest: PaymentChangeStatusRequest = {
        id: item.id,
        status: undefined,
        reason: item.reason
      };

      const dialogRef = this.dialog.open(PaymentChangeStatusComponent, {
        data: paymentChangeStatusRequest
      });

      dialogRef.afterClosed().subscribe(result => {
        if (!result) { return; }
        this.getPayments();
      });
    });
  }

  private getPayments() {
    let query = this.filterStatus.pending ? 'paymentStatus=0&' : '';
    query += this.filterStatus.approved ? 'paymentStatus=1&' : '';
    query += this.filterStatus.rejected ? 'paymentStatus=99&' : '';

    if (query.length > 0) {
      query = '?' + query;
      query = query.substr(0, query.length - 1);
    }

    console.log(query);
    this.paymentListService.getPayments(query).subscribe(data => {
      this.dataSource.data = data.map(item => {
        item.paymentDate = new Date(item.paymentDate);
        return item;
      });

      console.log(this.dataSource.data);
    });
  }
}
