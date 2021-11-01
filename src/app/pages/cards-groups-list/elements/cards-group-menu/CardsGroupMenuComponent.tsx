import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {default as React, FC} from 'react';

export const CardsGroupMenuComponent: FC<IListMenuComponent> = ({onEdit, onDelete}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
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
                <MenuItem onClick={onEdit}>Edit</MenuItem>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
        </>
    )
};

interface IListMenuComponent {
    onEdit: () => void
    onDelete: () => void
}
