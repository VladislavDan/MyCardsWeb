import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {default as React, FC} from 'react';

import {IListItemMenuComponent} from "./types/IListItemMenuComponent";

export const ListItemMenuComponent: FC<IListItemMenuComponent> = ({onEdit, onDelete, onResetProgress}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const editClick = () => {
        onEdit();
        handleClose();
    };

    const resetClick = () => {
        onResetProgress();
        handleClose();
    };

    const deleteClick = () => {
        onDelete();
        handleClose();
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
                <MenuItem onClick={editClick}>Edit</MenuItem>
                <MenuItem onClick={resetClick}>Reset progress</MenuItem>
                <MenuItem onClick={deleteClick}>Delete</MenuItem>
            </Menu>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
        </>
    )
};
