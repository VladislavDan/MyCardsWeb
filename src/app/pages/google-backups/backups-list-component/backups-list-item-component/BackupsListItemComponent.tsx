import {FC, default as React} from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

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
