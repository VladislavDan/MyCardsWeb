import {useEffect, useState} from 'react';
import {Subscription,Subject} from 'rxjs';

import {Channel} from '../Channel';

export const useSubscribe = <A, D>(channel: Channel<A, D>, next: (value: D) => void, error?: (error: Error) => void) => {
    const [state, setState] = useState<{ subscription: Subscription | null }>({
        subscription: null
    });

    useEffect(() => {

        if (!state.subscription || state.subscription.closed) {
            const subscription = channel.subscribe(next, error);

            setState({...state, subscription});
        }

        return () => {
            channel.unsubscribe();
        }
    }, []);
};
