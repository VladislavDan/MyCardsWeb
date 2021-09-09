import * as React from 'react';
import {useEffect, useState} from 'react';

import {useSubscribe} from '../../common/hooks/useSubscribe';
import {googleBackupsManager} from './GoogleBackupsService';
import {GoogleDriveFile} from '../../types/GoogleDriveFile';
import {BackupsListComponent} from './backups-list-component/BackupsListComponent';
import {useHistory} from 'react-router';
import {Routs} from '../../common/Routs';
import {spinnerManager} from '../../../App';

export const GoogleBackupsContainer = () => {

    const history = useHistory();

    const [state, setState] = useState<GoogleAuthComponentState>({
        backupsFiles: []
    });

    useSubscribe(
        googleBackupsManager.backupsNameLoadChannel,
        (backupsFiles: GoogleDriveFile[]) => {
            setState({...state, backupsFiles: backupsFiles});
            spinnerManager.spinnerCounterChannel.next(-1);
        },
        () => {
            history.replace(Routs.googleAuth.path);
        }
    );

    useSubscribe(
        googleBackupsManager.backupLoadChannel,
        () => {
            spinnerManager.spinnerCounterChannel.next(-1);
        },
        () => {
            history.replace(Routs.googleAuth.path);
        }
    );

    useEffect(() => {
        if (!state.backupsFiles.length) {
            googleBackupsManager.backupsNameLoadChannel.next('');
        }
    });

    return <BackupsListComponent backupsFiles={state.backupsFiles}/>;
};

interface GoogleAuthComponentState {
    backupsFiles: GoogleDriveFile[];
}
