import * as React from 'react';
import {useEffect, useState} from 'react';

import {useChannel} from '../../common/hooks/useChannel';
import {googleBackupsManager} from './GoogleBackupsService';
import {IGoogleDriveFile} from '../../types/IGoogleDriveFile';
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

    useChannel(
        googleBackupsManager.backupsNameLoadChannel,
        (backupsFiles: IGoogleDriveFile[]) => {
            setState({...state, backupsFiles: backupsFiles});
            spinnerManager.spinnerCounterChannel.next(-1);
        },
        () => {
            history.replace(Routs.googleAuth.path);
        }
    );

    useChannel(
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
    backupsFiles: IGoogleDriveFile[];
}
