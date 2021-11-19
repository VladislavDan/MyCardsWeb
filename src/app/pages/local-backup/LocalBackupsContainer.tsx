import * as React from 'react';
import {FC} from 'react';

import {useChannel} from '../../common/hooks/useChannel';
import {LocalBackupsService} from './LocalBackupsService';
import {Button} from '@mui/material';

export const LocalBackupsContainer: FC<ILocalBackupsContainer> = ({localBackupsService}) => {

    useChannel(
        localBackupsService.localBackupChannel
    );

    return <Button size="small" onClick={() => localBackupsService.localBackupChannel.next()}>
        Save
    </Button>
};

interface ILocalBackupsContainer {
    localBackupsService: LocalBackupsService
}
