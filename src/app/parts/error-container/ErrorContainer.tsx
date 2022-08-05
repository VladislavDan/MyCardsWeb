import React, {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ErrorComponent} from './ErrorComponent';
import {IErrorContainer} from "./types/IErrorContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {initialState} from "./defaults/initialState";
import {onErrorChannel} from "./channels-callbacks/onErrorChannel";
import {onClose} from "./ui-callbacks/onClose";
import {ErrorCallbackSettings} from "./types/ErrorCallbackSettings";

export const ErrorContainer: FC<IErrorContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<ErrorCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {errorService}} = callbackSettings

    useChannel(errorService.errorChannel, callbackFactory(onErrorChannel));

    const close = useCallback(callbackFactory(onClose), []);

    return <ErrorComponent isOpen={state.isOpen} errorMessage={state.errorMessage} handleClose={close}/>
};
