import {Subject, Observable, Subscription} from 'rxjs';

import {errorService, spinnerManager} from '../../App';

export class Channel<A, D> {

    private readonly outputSubject: Subject<D>;
    private observableCreator: (arg: A) => Observable<D>;
    private subscriptions: Subscription[] = [];

    constructor(observableCreator: (arg: A) => Observable<D>) {
        this.outputSubject = new Subject<D>();
        this.observableCreator = observableCreator;
    }

    next(value: A) {
        this.subscriptions.push(this.observableCreator(value).subscribe(this.outputSubject));
    }

    subscribe(next: (data: D) => void, additionalErrorHandler?: (error: Error) => void): Subscription {
        const outputSubjectSubscription = this.outputSubject.subscribe(
            next,
            (error: Error) => {
                if(additionalErrorHandler) {
                    additionalErrorHandler(error);
                }
                spinnerManager.spinnerCounterChannel.next(-1);
                errorService.errorChannel.next('Cannot load cards');
            }
        );
        this.subscriptions.push(outputSubjectSubscription);
        return outputSubjectSubscription;
    }

    unsubscribe() {
        this.subscriptions.forEach((subscribtion: Subscription) => {
            if(!subscribtion.closed) {
                subscribtion.unsubscribe();
            }
        });
        this.subscriptions = [];
    }
}
