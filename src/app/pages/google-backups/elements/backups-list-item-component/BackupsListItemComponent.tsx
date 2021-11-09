import {default as React, FC} from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@mui/material';

import {BackupMenuComponent} from '../backup-menu-component/BackupMenuComponent';

export const BackupsListItemComponent: FC<IBackupsListItemComponent> = ({backupName, backupID, onLoad}) => {

    return (
        <ListItem>
            <ListItemText
                primary={backupName}
            />
            <ListItemIcon>
                <BackupMenuComponent backupID={backupID} onLoad={onLoad}/>
            </ListItemIcon>
        </ListItem>
    );
};

interface IBackupsListItemComponent {
    backupName: string;
    backupID: string;
    onLoad: (backupID: string)=>void;
}
