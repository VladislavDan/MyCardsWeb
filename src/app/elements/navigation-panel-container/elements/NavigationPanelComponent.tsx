import * as React from 'react';
import {List, ListItem, SwipeableDrawer} from '@material-ui/core';
import {FC} from 'react';
import {ReactEventHandler} from 'react';
import {Link} from 'react-router-dom';

import {Routs} from '../../../common/Routs';
import {NavigationLinkComponent} from './elements/navigation-link-component/NavigationLinkComponent';

export const NavigationPanelComponent: FC<INavigationPanelComponent> = ({isOpen, toggleDrawer}) => {

    return (
        <SwipeableDrawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <List>
                <NavigationLinkComponent path={Routs.googleAuth.path} name={Routs.googleAuth.name} toggleDrawer={toggleDrawer}/>
            </List>
        </SwipeableDrawer>
    )
};

interface INavigationPanelComponent {
    isOpen: boolean
    toggleDrawer: (isOpen: boolean) => ReactEventHandler
}


