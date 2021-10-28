import * as React from 'react';

import {useChannel} from '../../common/hooks/useChannel';
import {localBackupsService} from './LocalBackupsService';
import {IGoogleDriveFile} from '../../types/IGoogleDriveFile';
import {Button} from '@mui/material';

export const LocalBackupsContainer = () => {

    useChannel(
        localBackupsService.localBackupChannel,
        () => {
        }
    );

    return <Button size="small" onClick={() => localBackupsService.localBackupChannel.next()}>
        Save
    </Button>
};

interface GoogleAuthComponentState {
    backupsFiles: IGoogleDriveFile[];
}
