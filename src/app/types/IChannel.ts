import {Subject, Observable, throwError, of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {spinnerManager} from '../elements/spinner-container/SpinnerManager';
import {errorManager} from '../elements/error-container/ErrorService';

export class IChannel<A, D> {

    private readonly outputSubject: Subject<D>;
    private observableCreator: (arg: A) => Observable<D>;
    private subscriptions: Subscription = new Subscription();

    constructor(observableCreator: (arg: A) => Observable<D>) {
        this.outputSubject = new Subject<D>();
        this.observableCreator = observableCreator;
    }

    next(value: A) {
        this.subscriptions.add(of(value).pipe(
            switchMap(() => this.observableCreator(value))
        ).subscribe(this.outputSubject));
    }

    subscribe(callback: (data: D) => void) {
        this.outputSubject.subscribe(
            callback,
            (error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot load cards');
                return throwError(error);
            }
        )
    }

    unsubscribe() {
        this.subscriptions.unsubscribe();
    }
}
