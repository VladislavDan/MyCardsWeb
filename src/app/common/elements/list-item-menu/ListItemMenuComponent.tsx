import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton, Menu, MenuItem} from '@mui/material';
import {default as React, FC} from 'react';

import {IListItemMenuComponent} from './types/IListItemMenuComponent';

export const ListItemMenuComponent: FC<IListItemMenuComponent> = (
    {menuSetup}
) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onMenuClick = (handler: () => void) => () => {
        handler();
        handleClose();
    }

    return (
        <>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuSetup.map((menuItem) => {
                    return <MenuItem key={menuItem.fieldName} onClick={onMenuClick(menuItem.handler)}>
                        {menuItem.fieldName}
                    </MenuItem>
                })}
            </Menu>
            <IconButton aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
        </>
    )
};
