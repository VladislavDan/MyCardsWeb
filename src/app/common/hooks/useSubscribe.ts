import {useEffect, useState} from 'react';
import {Subscription, Subject} from 'rxjs';

export const useSubscribe = <T>(channel: Subject<T>, subscriber: (value: T) => void, errorSubscriber?: () => void) => {
    const [state, setState] = useState<{ subscription: Subscription | null }>({
        subscription: null
    });

    useEffect(() => {

        if (!state.subscription || state.subscription.closed) {
            const subscription = channel.subscribe(subscriber, errorSubscriber);

            setState({...state, subscription});
        }

        return () => {
            state.subscription && state.subscription.unsubscribe();
        }
    });
};
