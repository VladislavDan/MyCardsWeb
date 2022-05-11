import * as React from 'react';
import {FC, useRef} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {LocalBackupsService} from './LocalBackupsService';
import {Button} from '@mui/material';
import {useUnsubscribe} from '../../../MyTools/react-hooks/useUnsubscribe';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';
import {SpinnerService} from '../../parts/spinner/SpinnerService';

export const LocalBackupsContainer: FC<ILocalBackupsContainer> = ({localBackupsService, confirmDialogService, spinnerService}) => {

    const fileBuffer = useRef(null);

    useChannel(
        localBackupsService.localBackupChannel
    );

    useChannel(
        localBackupsService.loadBackupChannel, () => {
            spinnerService.spinnerCounterChannel.next(-1);
        }
    );

    const { setSubscription } = useUnsubscribe();

    const handleFileSelect = (event: any) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (readerEvent: any) => {
            const games: string = readerEvent.target.result;

            const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
                if (isConfirm) {
                    spinnerService.spinnerCounterChannel.next(1);
                    localBackupsService.loadBackupChannel.next(games);
                }

                confirmDialogService.openDialogChannel.next({
                    isOpen: false,
                    message: ''
                })
            });

            setSubscription(subscription);

            confirmDialogService.openDialogChannel.next({
                isOpen: true,
                message: 'Do you want to load this backup, your current changes could be removed?'
            });
        };
        reader.readAsText(file);
    };

    return <>
        <input type="file" onChange={handleFileSelect}/>
        <a ref={fileBuffer}></a>
        <Button size="small" onClick={() => localBackupsService.localBackupChannel.next()}>
            Save
        </Button>
    </>
};

interface ILocalBackupsContainer {
    localBackupsService: LocalBackupsService;
    confirmDialogService: ConfirmDialogService;
    spinnerService: SpinnerService;
}
