import {IGoogleDriveFile} from '../../common/types/IGoogleDriveFile';
import {BackupsListItemComponent} from './elements/backups-list-item-component/BackupsListItemComponent';
import {List} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';
import {AddButtonComponent} from '../../common/elements/add-button/AddButtonComponent';


export const BackupsListComponent: FC<IBackupsListComponent> = ({backupsFiles, onLoad, onCreate, onDelete}) => {
    return (
        <>
            <List>
                {
                    backupsFiles.map((backup: IGoogleDriveFile) => {
                        return <BackupsListItemComponent
                            key={backup.id}
                            backupName={backup.createdTime}
                            onLoad={onLoad}
                            onDelete={onDelete}
                            backupID={backup.id}/>
                    })
                }
            </List>
            <AddButtonComponent onClick={onCreate}/>
        </>
    )
};

interface IBackupsListComponent {
    backupsFiles: IGoogleDriveFile[];
    onLoad: (backupID: string) => void;
    onCreate: () => void;
    onDelete: (backupID: string) => void;
}
