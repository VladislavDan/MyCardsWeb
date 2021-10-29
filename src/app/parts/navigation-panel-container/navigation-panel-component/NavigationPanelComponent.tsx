import * as React from 'react';
import {FC, ReactEventHandler} from 'react';
import {List, SwipeableDrawer} from '@mui/material';

import {Routs} from '../../../common/Routs';
import {NavigationLinkComponent} from './navigation-panel-component/navigation-link-component/NavigationLinkComponent';

export const NavigationPanelComponent: FC<INavigationPanelComponent> = ({isOpen, toggleDrawer}) => {

    return (
        <SwipeableDrawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <List>
                <NavigationLinkComponent path={Routs.cardsGroups.path} name={Routs.cardsGroups.name} toggleDrawer={toggleDrawer}/>
                <NavigationLinkComponent path={Routs.googleAuth.path} name={Routs.googleAuth.name} toggleDrawer={toggleDrawer}/>
                <NavigationLinkComponent path={Routs.localBackups.path} name={Routs.localBackups.name} toggleDrawer={toggleDrawer}/>
            </List>
        </SwipeableDrawer>
    )
};

interface INavigationPanelComponent {
    isOpen: boolean
    toggleDrawer: (isOpen: boolean) => ReactEventHandler
}


