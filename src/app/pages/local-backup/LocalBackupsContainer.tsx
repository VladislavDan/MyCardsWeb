import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {Button} from '@mui/material';
import {ILocalBackupsContainer} from "./types/ILocalBackupsContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {onLoadBackupChannel} from "./channels-callbacks/onLoadBackupChannel";
import {onFileSelect} from "./ui-callbacks/onFileSelect";
import {LocalBackupsCallbackSettings} from "./types/LocalBackupsCallbackSettings";

export const LocalBackupsContainer: FC<ILocalBackupsContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<LocalBackupsCallbackSettings>(
        null,
        services,
        AppContext
    );

    const {services: {localBackupsService}} = callbackSettings

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
