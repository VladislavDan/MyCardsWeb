import {GoogleDriveFile} from '../../../../types/GoogleDriveFile';
import {BackupsListItemComponent} from './elements/backups-list-item-component/BackupsListItemComponent';
import {List} from '@material-ui/core';
import * as React from 'react';
import {FC} from 'react';


export const BackupsListComponent: FC<IBackupsListComponent> = ({backupsFiles}) => {
    return (
        <List>
            {
                backupsFiles.map((backup: GoogleDriveFile) => {
                    return <BackupsListItemComponent
                        key={backup.id}
                        backupName={backup.createdTime}
                        backupID={backup.id}/>
                })
            }
        </List>
    )
};

interface IBackupsListComponent {
    backupsFiles: GoogleDriveFile[]
}
