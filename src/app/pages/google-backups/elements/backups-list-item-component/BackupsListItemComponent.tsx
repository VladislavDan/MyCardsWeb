import {default as React, FC} from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@mui/material';

import {BackupMenuComponent} from '../backup-menu-component/BackupMenuComponent';

export const BackupsListItemComponent: FC<IBackupsListItemComponent> = ({backupName, backupID, onLoad, onDelete}) => {

    return (
        <ListItem>
            <ListItemText
                primary={backupName}
            />
            <ListItemIcon>
                <BackupMenuComponent backupID={backupID} onLoad={onLoad} onDelete={onDelete}/>
            </ListItemIcon>
        </ListItem>
    );
};

interface IBackupsListItemComponent {
    backupName: string;
    backupID: string;
    onLoad: (backupID: string)=>void;
    onDelete: (backupID: string)=>void;
}
