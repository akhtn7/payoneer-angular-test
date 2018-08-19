import { PaymentListComponent } from './payment-list.component';

describe('PaymentListComponent', () => {
    let subject;
    const mockPaymentService = jasmine.createSpyObj('paymentService', ['getPayments', 'getPayment', 'updatePaymentStatus']);
    const mockMatDialog = jasmine.createSpyObj('dialog', ['open']);
    const mockRouter = jasmine.createSpyObj('router', ['navigate']);
    const mockActivatedRoute: any = {
        queryParams: jasmine.createSpyObj('queryParams', ['subscribe'])
    };

    beforeEach(() => {
        mockActivatedRoute.queryParams.subscribe.calls.reset();

        subject = new PaymentListComponent(
            mockPaymentService, mockMatDialog, mockRouter, mockActivatedRoute);
    });

    describe('constructor', () => {
        it('should be created', () => {
            expect(subject).toBeTruthy();
        });

        it('should set all fields of "filterStatus" to true', () => {
            expect(subject.filterStatus.pending).toBe(true);
            expect(subject.filterStatus.approved).toBe(true);
            expect(subject.filterStatus.rejected).toBe(true);
        });
    });

    describe('ngOnInit', () => {
        it('should call "route.queryParams.subscribe()"', () => {
            // act
            subject.ngOnInit();

            // assert
            expect(mockActivatedRoute.queryParams.subscribe).toHaveBeenCalledTimes(1);
        });
    });
});
