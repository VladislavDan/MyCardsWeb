import * as React from 'react';
import {useEffect, useState} from 'react';

import {useObservable} from '../../common/hooks/useObservable';
import {googleBackupsManager} from './GoogleBackupsService';
import {GoogleDriveFile} from '../../types/GoogleDriveFile';
import {BackupsListComponent} from './backups-list-component/BackupsListComponent';
import {useHistory} from 'react-router';
import {Routs} from '../../common/Routs';
import {spinnerManager} from '../../../App';
import {useConstructor} from '../../common/hooks/useConstructor';

export const GoogleBackupsContainer = () => {

    const history = useHistory();

    const [state, setState] = useState<GoogleAuthComponentState>({
        backupsFiles: []
    });

    useObservable(
        googleBackupsManager.backupsNameLoadChannel,
        (backupsFiles: GoogleDriveFile[]) => {
            setState({...state, backupsFiles: backupsFiles});
            spinnerManager.spinnerCounterChannel.next(-1);
        },
        () => {
            history.replace(Routs.googleAuth.path);
        }
    );

    useObservable(
        googleBackupsManager.backupLoadChannel,
        () => {
            spinnerManager.spinnerCounterChannel.next(-1);
        },
        () => {
            history.replace(Routs.googleAuth.path);
        }
    );

    useConstructor(() => {
        googleBackupsManager.backupsNameLoadChannel.next('');
    });

    return <BackupsListComponent backupsFiles={state.backupsFiles}/>;
};

interface GoogleAuthComponentState {
    backupsFiles: GoogleDriveFile[];
}
