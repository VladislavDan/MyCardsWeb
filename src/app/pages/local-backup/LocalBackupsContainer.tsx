import * as React from 'react';
import {FC, useRef} from 'react';
import LoadIcon from '@mui/icons-material/Download';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {Button} from '@mui/material';
import {useUnsubscribe} from '../../../MyTools/react-hooks/useUnsubscribe';
import {ILocalBackupsContainer} from "./types/ILocalBackupsContainer";
import {defaultConfirmDialogState} from "../../common/defaults/defaultConfirmDialogState";

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

                confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
            });

            setSubscription(subscription);

            confirmDialogService.openDialogChannel.next({
                isOpen: true,
                message: 'Do you want to load this backup, your current changes could be removed?',
                titleBackgroundColor: 'red',
                icon: <LoadIcon/>
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
