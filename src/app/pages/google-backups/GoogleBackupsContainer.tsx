import * as React from 'react';
import {FC, useState} from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {IGoogleDriveFile} from '../../common/types/IGoogleDriveFile';
import {GoogleBackupsComponent} from './GoogleBackupsComponent';
import {useHistory} from 'react-router';
import {Routs} from '../../common/Routs';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {useUnsubscribe} from '../../../MyTools/react-hooks/useUnsubscribe';
import {IGoogleBackupsContainer} from "./types/IGoogleBackupsContainer";
import {GoogleAuthComponentState} from "./types/GoogleAuthComponentState";
import {defaultConfirmDialogState} from "../../common/Constants";

export const GoogleBackupsContainer: FC<IGoogleBackupsContainer> = ({
                                                                        spinnerService,
                                                                        googleBackupsService,
                                                                        confirmDialogService
                                                                    }) => {

    const history = useHistory();

    const [state, setState] = useState<GoogleAuthComponentState>({
        backupsFiles: []
    });

    useChannel(
        googleBackupsService.backupsNameLoadChannel,
        (backupsFiles: IGoogleDriveFile[]) => {
            setState({...state, backupsFiles: backupsFiles});
            spinnerService.spinnerCounterChannel.next(-1);
        },
        () => {
            spinnerService.spinnerCounterChannel.next(-1);
            history.replace(Routs.googleAuth.path);
        }
    );

    useChannel(
        googleBackupsService.backupLoadChannel,
        () => {
            spinnerService.spinnerCounterChannel.next(-1);
        },
        () => {
            spinnerService.spinnerCounterChannel.next(-1);
            history.replace(Routs.googleAuth.path);
        }
    );

    useChannel(googleBackupsService.backupDeleteChannel, () => {
        spinnerService.spinnerCounterChannel.next(-1);
        googleBackupsService.backupsNameLoadChannel.next('')
    });

    useChannel(googleBackupsService.backupUploadChannel, () => {
        googleBackupsService.backupsNameLoadChannel.next('')
        spinnerService.spinnerCounterChannel.next(-1);
    });

    useConstructor(() => {
        googleBackupsService.backupsNameLoadChannel.next('');
    });

    const {setSubscription} = useUnsubscribe();

    const onLoad = (backupID: string) => {

        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                spinnerService.spinnerCounterChannel.next(1);
                googleBackupsService.backupLoadChannel.next(backupID);
            }

            confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to load this backup?',
            titleBackgroundColor: 'red',
            icon: <UploadIcon/>
        });
    };

    const onDelete = (backupID: string) => {

        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                spinnerService.spinnerCounterChannel.next(1);
                googleBackupsService.backupDeleteChannel.next(backupID);
            }

            confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to delete this backup?',
            titleBackgroundColor: 'red',
            icon: <DeleteIcon/>
        });
    };

    const onCreate = () => {
        spinnerService.spinnerCounterChannel.next(1);
        googleBackupsService.backupUploadChannel.next();
    };

    return <GoogleBackupsComponent
        backupsFiles={state.backupsFiles}
        onLoad={onLoad}
        onDelete={onDelete}
        onCreate={onCreate}
    />;
};
