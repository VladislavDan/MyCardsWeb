import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {GoogleBackupsComponent} from './GoogleBackupsComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {onBackupsNameLoadChannelError} from "./channels-callback/onBackupsNameLoadChannelError";
import {onBackupsNameLoadChannel} from "./channels-callback/onBackupsNameLoadChannel";
import {onBackupLoadChannelError} from "./channels-callback/onBackupLoadChannelError";
import {onBackupLoadChannel} from "./channels-callback/onBackupLoadChannel";
import {onBackupDeleteChannel} from "./channels-callback/onBackupDeleteChannel";
import {onBackupUploadChannel} from "./channels-callback/onBackupUploadChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onLoad} from "./ui-callbacks/onLoad";
import {onDelete} from "./ui-callbacks/onDelete";
import {GoogleBackupCallbackSettings} from "./types/GoogleBackupCallbackSettings";
import {useDependency} from "../../../MyTools/react-di/hooks/useDependency";
import {GoogleBackupsService} from "./GoogleBackupsService";
import {SpinnerService} from "../../parts/spinner/SpinnerService";
import {ConfirmDialogService} from "../../parts/confirm-dialog/ConfirmDialogService";

export const GoogleBackupsContainer: FC = () => {

    const googleBackupsService = useDependency(GoogleBackupsService);
    const spinnerService = useDependency(SpinnerService);
    const confirmDialogService = useDependency(ConfirmDialogService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<GoogleBackupCallbackSettings>(
        {
            backupsFiles: []
        },
        {
            googleBackupsService,
            spinnerService,
            confirmDialogService
        },
        AppContext
    );

    const {state} = externalCallbackSettings

    useChannel(
        googleBackupsService.backupsNameLoadChannel,
        callbackFactory(onBackupsNameLoadChannel),
        callbackFactory(onBackupsNameLoadChannelError)
    );
    useChannel(
        googleBackupsService.backupLoadChannel,
        callbackFactory(onBackupLoadChannel),
        callbackFactory(onBackupLoadChannelError)
    );
    useChannel(googleBackupsService.backupDeleteChannel, callbackFactory(onBackupDeleteChannel));
    useChannel(googleBackupsService.backupUploadChannel, callbackFactory(onBackupUploadChannel));

    useConstructor(callbackFactory(onConstructor));

    const load = useCallback(callbackFactory(onLoad), []);
    const deleteBackup = useCallback(callbackFactory(onDelete), []);

    const onCreate = () => {
        spinnerService.spinnerCounterChannel.next(1);
        googleBackupsService.backupUploadChannel.next();
    };

    return <GoogleBackupsComponent
        backupsFiles={state.backupsFiles}
        onLoad={load}
        onDelete={deleteBackup}
        onCreate={onCreate}
    />;
};
