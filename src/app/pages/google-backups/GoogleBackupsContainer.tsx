import * as React from 'react';
import {FC, useState} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {GoogleBackupsService} from './GoogleBackupsService';
import {IGoogleDriveFile} from '../../types/IGoogleDriveFile';
import {BackupsListComponent} from './BackupsListComponent';
import {useHistory} from 'react-router';
import {Routs} from '../../common/Routs';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {SpinnerService} from '../../parts/spinner/SpinnerService';
import {useUnsubscribe} from '../../../MyTools/react-hooks/useUnsubscribe';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';

export const GoogleBackupsContainer: FC<IGoogleBackupsContainer> = ({spinnerService, googleBackupsService, confirmDialogService}) => {

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
    });

    useChannel(googleBackupsService.backupUploadChannel, () => {
        spinnerService.spinnerCounterChannel.next(-1);
    });

    useConstructor(() => {
        googleBackupsService.backupsNameLoadChannel.next('');
    });

    const { setSubscription } = useUnsubscribe();

    const onLoad = (backupID: string) => {
        spinnerService.spinnerCounterChannel.next(1);
        googleBackupsService.backupLoadChannel.next(backupID);
    };

    const onDelete = (backupID: string) => {
        googleBackupsService.backupLoadChannel.next(backupID);

        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                spinnerService.spinnerCounterChannel.next(1);
                googleBackupsService.backupDeleteChannel.next(backupID);
            }

            confirmDialogService.openDialogChannel.next({
                isOpen: false,
                message: ''
            })
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to delete this backup?'
        });
    };

    const onCreate = () => {
        spinnerService.spinnerCounterChannel.next(1);
        googleBackupsService.backupUploadChannel.next();
    };

    return <BackupsListComponent backupsFiles={state.backupsFiles} onLoad={onLoad} onDelete={onDelete} onCreate={onCreate}/>;
};

interface IGoogleBackupsContainer {
    spinnerService: SpinnerService;
    googleBackupsService: GoogleBackupsService;
    confirmDialogService: ConfirmDialogService;
}

interface GoogleAuthComponentState {
    backupsFiles: IGoogleDriveFile[];
}
