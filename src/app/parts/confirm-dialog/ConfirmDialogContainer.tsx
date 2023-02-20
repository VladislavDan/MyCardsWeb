import * as React from 'react';
import {FC, useCallback} from 'react';

import {ConfirmDialogComponent} from './ConfirmDialogComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {defaultConfirmDialogState} from '../../common/defaults/defaultConfirmDialogState';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {onOpenDialogChannel} from './channels-callbacks/onOpenDialogChannel';
import {onClose} from './ui-callbacks/onClose';
import {onClickAgree} from './ui-callbacks/onClickAgree';
import {onClickDisagree} from './ui-callbacks/onClickDisagree';
import {ConfirmDialogCallbackSettings} from './types/ConfirmDialogCallbackSettings';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {ConfirmDialogService} from './ConfirmDialogService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const ConfirmDialogContainer: FC = () => {

    const confirmDialogService = useDependencyContext<ConfirmDialogService>(IDependenciesNames.ConfirmDialogService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<ConfirmDialogCallbackSettings>(
        defaultConfirmDialogState,
        {
            confirmDialogService
        },
        AppContext
    );

    const {state} = externalCallbackSettings

    useChannel(confirmDialogService.openDialogChannel, callbackFactory(onOpenDialogChannel));

    const close = useCallback(callbackFactory(onClose), []);
    const clickAgree = useCallback(callbackFactory(onClickAgree), [])
    const clickDisagree = useCallback(callbackFactory(onClickDisagree), [])

    return <ConfirmDialogComponent
        isOpen={state.isOpen}
        onClickAgree={clickAgree}
        onClickDisagree={clickDisagree}
        onClose={close}
        message={state.message}
        titleBackgroundColor={state.titleBackgroundColor}
        icon={state.icon}
    />
};
