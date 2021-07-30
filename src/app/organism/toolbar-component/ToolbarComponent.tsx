import React, {ReactElement, useEffect, useState} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import * as H from 'history';
import {useLocation} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import {toolbarManager} from './ToolbarManager';

export const ToolbarComponent = ({}: IToolbarComponentProps): ReactElement => {

    const location: H.Location = useLocation();
    const [pageLabel, setPageLabel] = useState('');

    useEffect(() => {
        const newPageLabel = toolbarManager.getPageLabel(location.pathname);
        setPageLabel(newPageLabel);
    });

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">
                    {pageLabel}
                </Typography>
            </Toolbar>
        </AppBar>
    )

};

interface IToolbarComponentProps {

}
