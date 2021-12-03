import {Observable, Subject, Subscription} from 'rxjs';

export class Channel<A, D> {

    private readonly outputSubject: Subject<D>;
    private observableCreator: (arg: A) => Observable<D>;
    private channelSubscriptions: { token: string, subscription: Subscription }[] = [];
    private defaultToken = '';

    constructor(observableCreator: (arg: A) => Observable<D>) {
        this.outputSubject = new Subject<D>();
        this.observableCreator = observableCreator;
    }

    next(value: A) {
        const subscription = this.observableCreator(value).subscribe((value) => {
            this.outputSubject.next(value);
        });
        this.channelSubscriptions.push({
            token: this.defaultToken,
            subscription: subscription
        });
    }

    subscribe(next?: (data: D) => void, errorHandler?: (error: Error) => void, subscriptionToken?: string): Subscription {


        const outputSubjectSubscription = this.outputSubject.subscribe(
            (data: D) => {
                if(next) {
                    next(data)
                }
            },
            (error: Error) => {
                if(errorHandler) {
                    errorHandler(error);
                }
                console.error(error)
            }
        );
        this.channelSubscriptions.push({
            token: subscriptionToken || this.defaultToken,
            subscription: outputSubjectSubscription
        });
        return outputSubjectSubscription;
    }

    unsubscribe(subscriptionToken?: string) {
        this.channelSubscriptions.forEach(({ subscription, token}) => {
            if(subscriptionToken && token === subscriptionToken ) {
                this.softUnsubscribe(subscription);
            } else if( !subscriptionToken && token === this.defaultToken ) {
                this.softUnsubscribe(subscription)
            }
        });

        if(!subscriptionToken && this.channelSubscriptions.length !== 0) {
            console.error('You have unsubscribed by token subscriptions')
        }
        this.channelSubscriptions = [];
    }

    private softUnsubscribe(subscription: Subscription) {
        if(!subscription.closed) {
            subscription.unsubscribe();
        }
    }
}
