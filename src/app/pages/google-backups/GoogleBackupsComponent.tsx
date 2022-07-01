import {List} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';

import {IGoogleDriveFile} from '../../common/types/IGoogleDriveFile';
import {BackupsListItemComponent} from './elements/backups-list-item-component/BackupsListItemComponent';
import {AddButtonComponent} from '../../common/elements/add-button/AddButtonComponent';
import {IBackupsListComponent} from "../local-backup/types/IBackupsListComponent";


export const GoogleBackupsComponent: FC<IBackupsListComponent> = ({backupsFiles, onLoad, onCreate, onDelete}) => {
    return (
        <>
            <List>
                {
                    backupsFiles.map((backup: IGoogleDriveFile) => {
                        return <BackupsListItemComponent
                            key={backup.id}
                            backupName={backup.name}
                            backupDate={backup.createdTime}
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
