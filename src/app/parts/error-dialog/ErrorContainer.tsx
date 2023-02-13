import React, {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ErrorComponent} from './ErrorComponent';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {initialState} from './defaults/initialState';
import {onErrorChannel} from './channels-callbacks/onErrorChannel';
import {onClose} from './ui-callbacks/onClose';
import {ErrorCallbackSettings} from './types/ErrorCallbackSettings';
import {useDependency} from '../../../MyTools/react-di/hooks/useDependency';
import {ErrorService} from './ErrorService';

export const ErrorContainer: FC = () => {

    const errorService = useDependency(ErrorService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<ErrorCallbackSettings>(
        initialState,
        {
            errorService
        },
        AppContext
    );

    const {state} = externalCallbackSettings

    useChannel(errorService.errorChannel, callbackFactory(onErrorChannel));

    const close = useCallback(callbackFactory(onClose), []);

    return <ErrorComponent isOpen={state.isOpen} errorMessage={state.errorMessage} handleClose={close}/>
};
