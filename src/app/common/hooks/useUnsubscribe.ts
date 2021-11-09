import {useEffect, useState} from 'react';
import {Subscription} from 'rxjs';

export const useUnsubscribe = () => {

    const [subscriptions, setSubscription] = useState<Array<Subscription>>([]);

    useEffect(() => {
        return () => {
            subscriptions.forEach((subscription: Subscription) => {
                if( !subscription.closed ) {
                    subscription.unsubscribe();
                }
            });
            setSubscription([]);
        }
    }, []);

    return (subscribtion: Subscription) => {
        setSubscription([...subscriptions, subscribtion]);
    }
};
