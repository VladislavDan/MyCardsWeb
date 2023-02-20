import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {Button} from '@mui/material';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {onLoadBackupChannel} from './channels-callbacks/onLoadBackupChannel';
import {onFileSelect} from './ui-callbacks/onFileSelect';
import {LocalBackupsCallbackSettings} from './types/LocalBackupsCallbackSettings';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {LocalBackupsService} from './LocalBackupsService';
import {SpinnerService} from '../../parts/spinner/SpinnerService';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const LocalBackupsContainer: FC = () => {

    const localBackupsService = useDependencyContext<LocalBackupsService>(IDependenciesNames.LocalBackupsService);
    const spinnerService = useDependencyContext<SpinnerService>(IDependenciesNames.SpinnerService);
    const confirmDialogService = useDependencyContext<ConfirmDialogService>(IDependenciesNames.ConfirmDialogService);

    const {
        callbackFactory
    } = useCallbackFactory<LocalBackupsCallbackSettings>(
        null,
        {
            localBackupsService,
            spinnerService,
            confirmDialogService
        },
        AppContext
    );

    useChannel(localBackupsService.localBackupChannel);
    useChannel(localBackupsService.loadBackupChannel, callbackFactory(onLoadBackupChannel));

    const handleFileSelect = useCallback(callbackFactory(onFileSelect), [])

    return <>
        <input type="file" onChange={handleFileSelect}/>
        <Button size="small" onClick={() => localBackupsService.localBackupChannel.next()}>
            Save
        </Button>
    </>
};
