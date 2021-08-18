import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
    IconButton,
    Menu,
    MenuItem
} from '@material-ui/core';
import {default as React, FC} from 'react';

import {googleBackupsManager} from '../../../../../../GoogleBackupsManager';

export const BackupMenuComponent: FC<IBackupMenuComponent> = ({backupID}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLoad = () => {
        googleBackupsManager.backupLoadChannel.next(backupID);
        setAnchorEl(null);
    };

    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onLoad}>Load</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
        </>
    )
};

interface IBackupMenuComponent {
    backupID: string;
}
