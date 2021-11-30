import {IGoogleDriveFile} from '../../types/IGoogleDriveFile';
import {BackupsListItemComponent} from './elements/backups-list-item-component/BackupsListItemComponent';
import {List} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';
import {AddButton} from '../../common/elements/add-button/AddButton';


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
            <AddButton onClick={onCreate}/>
        </>
    )
};

interface IBackupsListComponent {
    backupsFiles: IGoogleDriveFile[];
    onLoad: (backupID: string) => void;
    onCreate: () => void;
    onDelete: (backupID: string) => void;
}
