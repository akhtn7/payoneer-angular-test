import { inject } from '@angular/core/testing';
import { of } from 'rxjs';

import { PaymentService } from './payment.service';
import { PaymentChangeStatusRequest } from './entities/payment-change-status-request.model';

describe('PaymentService', () => {
  let subject;
  const mockHttpClient = jasmine.createSpyObj('httpClient', ['get', 'put']);

  beforeEach(() => {
    mockHttpClient.get.and.returnValue(of({}));
    mockHttpClient.get.calls.reset();
    mockHttpClient.put.and.returnValue(of({}));
    mockHttpClient.put.calls.reset();
    subject = new PaymentService(mockHttpClient);
  });

  describe('constructor', () => {
    it('should be created', () => {
      expect(subject).toBeTruthy();
    });
  });

  describe('getPayments', () => {
    it(`should send an expected request url`, () => {
      // arrange
      const query = 'queryString';
      const expectedUrl = `/api/payments${query}`;

      // act
      subject.getPayments(query).subscribe();

      // assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl);
      expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPayment', () => {
    it(`should send an expected request url`, () => {
      // arrange
      const paymentId = 25;
      const expectedUrl = `/api/payments/${paymentId}`;

      // act
      subject.getPayment(paymentId).subscribe();

      // assert
      expect(mockHttpClient.get).toHaveBeenCalledWith(expectedUrl);
      expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('updatePaymentStatus', () => {
    it(`should send an expected request url and data`, () => {
      // arrange
      const request: PaymentChangeStatusRequest = {
        id: 1,
        status: 99,
        reason: 'reason'
      };

      const expectedUrl = `/api/payments/${request.id}`;

      // act
      subject.updatePaymentStatus(request).subscribe();

      // assert
      expect(mockHttpClient.put).toHaveBeenCalledWith(expectedUrl, request);
      expect(mockHttpClient.put).toHaveBeenCalledTimes(1);
    });
  });
});
