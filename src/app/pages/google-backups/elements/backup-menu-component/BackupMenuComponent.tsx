import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {default as React, FC} from 'react';


export const BackupMenuComponent: FC<IBackupMenuComponent> = ({backupID, onLoad}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLoadBackup = () => {
        setAnchorEl(null);
        onLoad(backupID);
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
                <MenuItem onClick={onLoadBackup}>Load</MenuItem>
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
    onLoad: (backupID: string)=>void;
}
