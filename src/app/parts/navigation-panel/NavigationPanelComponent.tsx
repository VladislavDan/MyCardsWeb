import * as React from 'react';
import {FC} from 'react';
import {List, SwipeableDrawer} from '@mui/material';

import {Routs} from '../../common/Routs';
import {NavigationLinkComponent} from './elements/navigation-link-component/NavigationLinkComponent';
import {INavigationPanelComponent} from "./types/INavigationPanelComponent";

export const NavigationPanelComponent: FC<INavigationPanelComponent> = ({isOpen, toggleDrawer}) => {

    return (
        <SwipeableDrawer
            anchor="left"
            open={isOpen}
            onClose={toggleDrawer}
            onOpen={toggleDrawer}
        >
            <List>
                <NavigationLinkComponent path={Routs.cardsGroups.path} name={Routs.cardsGroups.name}
                                         toggleDrawer={toggleDrawer}/>
                <NavigationLinkComponent path={Routs.repeaterList.path} name={Routs.repeaterList.name}
                                         toggleDrawer={toggleDrawer}/>
                <NavigationLinkComponent path={Routs.statistic.path} name={Routs.statistic.name}
                                         toggleDrawer={toggleDrawer}/>
                <NavigationLinkComponent path={Routs.googleAuth.path} name={Routs.googleAuth.name}
                                         toggleDrawer={toggleDrawer}/>
                <NavigationLinkComponent path={Routs.localBackups.path} name={Routs.localBackups.name}
                                         toggleDrawer={toggleDrawer}/>
                <NavigationLinkComponent path={Routs.settings.path} name={Routs.settings.name}
                                         toggleDrawer={toggleDrawer}/>
            </List>
        </SwipeableDrawer>
    )
};


