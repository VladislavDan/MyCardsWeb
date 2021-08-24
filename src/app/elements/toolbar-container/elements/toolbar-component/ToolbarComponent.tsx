import {FC, MouseEventHandler} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import './ToolbarComponent.css'
import {Routs} from '../../../../common/Routs';
import {useHistory, useLocation} from 'react-router';

export const ToolbarComponent: FC<IToolbarComponent> = ({pageLabel, onClick}) => {

    const history = useHistory();
    const location = useLocation();

    const onOpenRepeater = () => {

        if(pageLabel === Routs.cards.name) {
            history.push({
                pathname: Routs.cardsRepeater.path,
                state: location.state
            })
        } else {
            history.push({
                pathname: Routs.cardsRepeater.path,
                state: null
            })
        }

    };

    return (
        <AppBar position="fixed">
            <Toolbar className="toolbar">
                <IconButton className="toolbar_menu-icon" edge="start" color="inherit" aria-label="menu" onClick={onClick}>
                    <MenuIcon/>
                </IconButton>
                <Typography className="toolbar_label" variant="h6">
                    {pageLabel}
                </Typography>
                {pageLabel === Routs.cards.name || pageLabel === Routs.cardsGroups.name ? <IconButton color="inherit" onClick={onOpenRepeater}>
                    <PlayArrowIcon/>
                </IconButton> : null}
            </Toolbar>
        </AppBar>
    )
};

interface IToolbarComponent {
    pageLabel: string;
    onClick: MouseEventHandler
}
