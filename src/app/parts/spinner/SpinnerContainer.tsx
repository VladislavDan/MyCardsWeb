import * as React from 'react';
import {FC} from 'react';

import {SpinnerComponent} from './SpinnerComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ISpinnerContainer} from "./types/ISpinnerContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {SpinnerCallbackSettings} from "./types/SpinnerCallbackSettings";
import {onSpinnerCounterChannel} from "./channels-callbacks/onSpinnerCounterChannel";

export const SpinnerContainer: FC<ISpinnerContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<SpinnerCallbackSettings>(
        false,
        services,
        AppContext
    );

    const {state, services: {spinnerService}} = callbackSettings

    useChannel<number, number>(spinnerService.spinnerCounterChannel, callbackFactory(onSpinnerCounterChannel));

    return <SpinnerComponent isShow={state}/>
};
