export class Payment  {
    id: number;
    accountHolderId: number;
    accountHolderName: string;
    paymentDate: Date;
    amount: number;
    currency: string;
    status: number;
    statusDescription;
    reason: string;
}
