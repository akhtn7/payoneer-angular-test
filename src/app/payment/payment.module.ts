import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentChangeStatusComponent } from './payment-change-status/payment-change-status.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [PaymentListComponent, PaymentChangeStatusComponent],
  entryComponents: [PaymentChangeStatusComponent],
  exports: [PaymentListComponent, PaymentChangeStatusComponent]
})
export class PaymentModule { }
