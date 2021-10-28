import {default as React, FC} from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@mui/material';

import {BackupMenuComponent} from './backup-menu-component/BackupMenuComponent';

export const BackupsListItemComponent: FC<IBackupsListItemComponent> = ({backupName, backupID}) => {

    return (
        <ListItem>
            <ListItemText
                primary={backupName}
            />
            <ListItemIcon>
                <BackupMenuComponent backupID={backupID}/>
            </ListItemIcon>
        </ListItem>
    );
};

interface IBackupsListItemComponent {
    backupName: string;
    backupID: string;
}
