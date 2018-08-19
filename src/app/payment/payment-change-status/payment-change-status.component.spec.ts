import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChangeStatusComponent } from './payment-change-status.component';

describe('PaymentChangeStatusComponent', () => {
  let component: PaymentChangeStatusComponent;
  let fixture: ComponentFixture<PaymentChangeStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentChangeStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
