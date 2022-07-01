import {FC} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import './ToolbarComponent.css'
import {IToolbarComponent} from "./types/IToolbarComponent";

export const ToolbarComponent: FC<IToolbarComponent> = ({pageLabel, onClick}) => {

    return (
        <AppBar position="fixed">
            <Toolbar className="toolbar">
                <IconButton className="toolbar_menu-icon" edge="start" color="inherit" aria-label="menu"
                            onClick={onClick}>
                    <MenuIcon/>
                </IconButton>
                <Typography className="toolbar_label" variant="h6">
                    {pageLabel}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};
