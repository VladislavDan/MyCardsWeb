import {FC, MouseEventHandler} from 'react';
import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';

import './ToolbarComponent.css'
import {useHistory, useLocation} from 'react-router';
import {Routs} from '../../../common/Routs';

export const ToolbarComponent: FC<IToolbarComponent> = ({pageLabel, onClick}) => {

    const history = useHistory();
    const location = useLocation();

    const onOpenRepeater = () => {

        if (pageLabel === Routs.cards.name) {
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

    const onOpenEditor = () => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: location.state
        })
    };

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
                {pageLabel === Routs.cards.name || pageLabel === Routs.cardsGroups.name ?
                    <IconButton color="inherit" onClick={onOpenRepeater}>
                        <PlayArrowIcon/>
                    </IconButton> : null}
                {pageLabel === Routs.cardsRepeater.name ? <IconButton color="inherit" onClick={onOpenEditor}>
                    <EditIcon/>
                </IconButton> : null}
            </Toolbar>
        </AppBar>
    )
};

interface IToolbarComponent {
    pageLabel: string;
    onClick: MouseEventHandler
}
