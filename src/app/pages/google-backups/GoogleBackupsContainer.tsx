import * as React from 'react';
import {FC, useState} from 'react';

import {useChannel} from '../../common/hooks/useChannel';
import {GoogleBackupsService} from './GoogleBackupsService';
import {IGoogleDriveFile} from '../../types/IGoogleDriveFile';
import {BackupsListComponent} from './BackupsListComponent';
import {useHistory} from 'react-router';
import {Routs} from '../../common/Routs';
import {useConstructor} from '../../common/hooks/useConstructor';
import {SpinnerService} from '../../parts/spinner-container/SpinnerService';

export const GoogleBackupsContainer: FC<IGoogleBackupsContainer> = ({spinnerService, googleBackupsService}) => {

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
            history.replace(Routs.googleAuth.path);
        }
    );

    useChannel(
        googleBackupsService.backupLoadChannel,
        () => {
            spinnerService.spinnerCounterChannel.next(-1);
        },
        () => {
            history.replace(Routs.googleAuth.path);
        }
    );

    useConstructor(() => {
        googleBackupsService.backupsNameLoadChannel.next('');
    });

    const onLoad = (backupID: string) => {
        googleBackupsService.backupLoadChannel.next(backupID);
    };

    return <BackupsListComponent backupsFiles={state.backupsFiles} onLoad={onLoad}/>;
};

interface IGoogleBackupsContainer {
    spinnerService: SpinnerService;
    googleBackupsService: GoogleBackupsService;
}

interface GoogleAuthComponentState {
    backupsFiles: IGoogleDriveFile[];
}
