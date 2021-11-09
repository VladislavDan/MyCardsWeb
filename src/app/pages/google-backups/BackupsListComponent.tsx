import {IGoogleDriveFile} from '../../types/IGoogleDriveFile';
import {BackupsListItemComponent} from './elements/backups-list-item-component/BackupsListItemComponent';
import {List} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';


export const BackupsListComponent: FC<IBackupsListComponent> = ({backupsFiles, onLoad}) => {
    return (
        <List>
            {
                backupsFiles.map((backup: IGoogleDriveFile) => {
                    return <BackupsListItemComponent
                        key={backup.id}
                        backupName={backup.createdTime}
                        onLoad={onLoad}
                        backupID={backup.id}/>
                })
            }
        </List>
    )
};

interface IBackupsListComponent {
    backupsFiles: IGoogleDriveFile[];
    onLoad: (backupID: string) => void;
}
