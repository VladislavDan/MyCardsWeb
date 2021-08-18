import {Link} from 'react-router-dom';
import {Routs} from '../../../../../common/Routs';
import {ListItem} from '@material-ui/core';
import * as React from 'react';
import {FC, ReactEventHandler} from 'react';

export const NavigationLinkComponent: FC<INavigationLinkComponent> = ({path, name, toggleDrawer}: INavigationLinkComponent) => {

    return (
        <ListItem button>
            <Link to={path} onClick={toggleDrawer(false)}>
                {name}
            </Link>
        </ListItem>
    )
};

interface INavigationLinkComponent {
    path: string;
    name: string;
    toggleDrawer: (isOpen: boolean) => ReactEventHandler
}
