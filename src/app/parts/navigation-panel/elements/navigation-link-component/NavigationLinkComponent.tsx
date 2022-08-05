import {Link} from 'react-router-dom';
import {ListItem} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';

import {INavigationLinkComponent} from "./types/INavigationLinkComponent";

export const NavigationLinkComponent: FC<INavigationLinkComponent> = (
    {
        path,
        name,
        toggleDrawer
    }: INavigationLinkComponent
) => {
    return (
        <ListItem button>
            <Link to={path} onClick={toggleDrawer}>
                {name}
            </Link>
        </ListItem>
    )
};
