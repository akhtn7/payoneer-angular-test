import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';

import { Payment } from '../entities/payment.model';
import { PaymentService } from '../payment.service';
import { PaymentChangeStatusComponent } from '../payment-change-status/payment-change-status.component';
import { PaymentChangeStatusRequest } from '../entities/payment-change-status-request.model';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

class FilterStatus {
  pending: boolean;
  approved: boolean;
  rejected: boolean;
}

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  filterStatus: FilterStatus;
  changeStatusPaymentId: number;
  displayedColumns = ['paymentDate', 'status', 'amount', 'reason', 'changeStatus'];
  dataSource = new MatTableDataSource<Payment>();

  constructor(
    private paymentListService: PaymentService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {
    this.filterStatus = {
      pending: true,
      approved: true,
      rejected: true
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filterStatus.pending = params['pending'] === 'true';
      this.filterStatus.approved = params['approved'] === 'true';
      this.filterStatus.rejected = params['rejected'] === 'true';

      this.getPayments();

      if (params['changeStatus']) {
        this.changeStatusPaymentId = +params['changeStatus'];
        this.changeStatusHandler(this.changeStatusPaymentId);
      }
    });
  }

  onFilterStatusChanged() {
    this.setQueryParams();
  }

  onChangeStatus(paymentId: number) {
    this.changeStatusPaymentId = paymentId;
    this.setQueryParams();
  }

  private getPayments() {
    const query = this.createQueryString();

    console.log('query:', query);
    this.paymentListService.getPayments(query).subscribe(data => {
      this.dataSource.data = data.map(item => {
        item.paymentDate = new Date(item.paymentDate);
        return item;
      });

      console.log('data:', this.dataSource.data);
    });
  }

  private setQueryParams(): Promise<boolean> {
    const queryParams: any = {
      pending: this.filterStatus.pending,
      approved: this.filterStatus.approved,
      rejected: this.filterStatus.rejected
    };

    if (this.changeStatusPaymentId) { queryParams.changeStatus = this.changeStatusPaymentId; }

    return this.router.navigate(['/payments'],
      {
        queryParams: queryParams,
        replaceUrl: true
      });
  }

  private changeStatusHandler(paymentId: number) {
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
        this.changeStatusPaymentId = undefined;
        this.setQueryParams();

        if (!result) { return; }

        this.getPayments();

      });
    });
  }

  private createQueryString(): string {
    let query = this.filterStatus.pending ? 'paymentStatus=0&' : '';
    query += this.filterStatus.approved ? 'paymentStatus=1&' : '';
    query += this.filterStatus.rejected ? 'paymentStatus=99&' : '';

    if (query.length > 0) {
      query = '?' + query;
      query = query.substr(0, query.length - 1);
    }

    return query;
  }
}
