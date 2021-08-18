import {FC, MouseEventHandler} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const ToolbarComponent: FC<IToolbarComponent> = ({pageLabel, onClick}) => {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onClick}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    {pageLabel}
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

interface IToolbarComponent {
    pageLabel: string;
    onClick: MouseEventHandler
}
