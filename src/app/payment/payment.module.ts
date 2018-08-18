import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';
import { PaymentListComponent } from './payment-list/payment-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [PaymentListComponent],
  exports: [PaymentListComponent]
})
export class PaymentModule { }
