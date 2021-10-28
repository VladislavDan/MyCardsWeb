import {useEffect, useState} from 'react';
import {Subscription} from 'rxjs';

import {Channel} from '../Channel';

export const useChannel = <A, D>(channel: Channel<A, D>, next?: (value: D) => void, additionalErrorHandler?: (error: Error) => void) => {
    const [state, setState] = useState<{ subscription: Subscription | null }>({
        subscription: null
    });

    useEffect(() => {

        if (!state.subscription || state.subscription.closed) {
            const subscription = channel.subscribe(next, additionalErrorHandler);

            setState({...state, subscription});
        }

        return () => {
            channel.unsubscribe();
        }
    }, []);
};
