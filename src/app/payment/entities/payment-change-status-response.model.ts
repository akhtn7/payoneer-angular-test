import { PaymentChangeStatusResult } from './payment-change-status-result.enum';

export class PaymentChangeStatusResponse {
    result: PaymentChangeStatusResult;
    message: string;
}
