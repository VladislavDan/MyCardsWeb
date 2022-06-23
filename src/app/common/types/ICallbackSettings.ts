import {Subscription} from "rxjs";
import * as H from 'history';

import {INavigationState} from "./INavigationState";

export interface ICallbackSettings<S, P> {
    setSubscription: (subscription: Subscription) => void;
    location: H.Location<INavigationState>;
    history: H.History;
    state: S;
    setState: (callback: (arg: S) => S) => void;
    services: P;
}