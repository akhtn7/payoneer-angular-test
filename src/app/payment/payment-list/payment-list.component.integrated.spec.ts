import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from 'node_modules/@angular/forms';
import { BrowserAnimationsModule } from 'node_modules/@angular/platform-browser/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { PaymentListComponent } from './payment-list.component';
import { MaterialModule } from '../../shared/material.module';
import { PaymentService } from '../payment.service';
import { testPayments } from '../../test/data/payment-list-component-test-data';

describe('PaymentListComponent', () => {
  let component: PaymentListComponent;
  let fixture: ComponentFixture<PaymentListComponent>;
  const mockPaymentService = jasmine.createSpyObj('PaymentService', ['getPayments', 'getPayment', 'updatePaymentStatus']);
  const mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockActivatedRoute: any = {
    queryParams: jasmine.createSpyObj('queryParams', ['subscribe'])
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentListComponent],
      imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
      providers: [
        { provide: PaymentService, useValue: mockPaymentService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();
  }), 30000);

  beforeEach(() => {
    mockPaymentService.getPayments.and.returnValue(
      of(JSON.parse(JSON.stringify(testPayments))));

    fixture = TestBed.createComponent(PaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('constructor', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('UI', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should show title', () => {
      // arrange
      const title = fixture.nativeElement.querySelector('h1');

      // assert
      expect(title.innerText).toBe('Pending payments');
    });

    it('should show filter title', () => {
      // arrange
      const title = fixture.nativeElement.querySelector('.filter-checkbox:nth-child(1)');

      // assert
      expect(title.innerText).toBe('Show payments with status:');
    });

    it('should show table header', () => {
      // assert
      const paymentDate = fixture.nativeElement.querySelector('.mat-column-paymentDate');
      const status = fixture.nativeElement.querySelector('.mat-column-status');
      const amount = fixture.nativeElement.querySelector('.mat-column-amount');
      const reason = fixture.nativeElement.querySelector('.mat-column-reason');
      const changeStatus = fixture.nativeElement.querySelector('.mat-column-changeStatus');

      // assert
      expect(paymentDate.innerText).toBe('Payment Date');
      expect(status.innerText).toBe('Status');
      expect(amount.innerText).toBe('Amount');
      expect(reason.innerText).toBe('Reason');
      expect(changeStatus.innerText).toBe('Change status');
    });
  });
});
