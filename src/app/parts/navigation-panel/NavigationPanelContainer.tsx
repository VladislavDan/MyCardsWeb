import * as React from 'react';
import {FC, useCallback} from 'react';

import {NavigationPanelComponent} from './NavigationPanelComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {INavigationPanelContainer} from "./types/INavigationPanelContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {initialState} from "./defaults/initialState";
import {onNavigationPanelOpenChannel} from "./channels-callbacks/onNavigationPanelOpenChannel";
import {onToggleDrawer} from "./ui-callbacks/onToggleDrawer";
import {NavigationPanelCallbackSettings} from "./types/NavigationPanelCallbackSettings";

export const NavigationPanelContainer: FC<INavigationPanelContainer> = (services) => {
    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<NavigationPanelCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {navigationPanelService}} = callbackSettings

    useChannel(navigationPanelService.navigationPanelOpenChannel, callbackFactory(onNavigationPanelOpenChannel));

    const toggleDrawer = useCallback(callbackFactory(onToggleDrawer), []);

    return (
        <NavigationPanelComponent isOpen={state.isOpen} toggleDrawer={toggleDrawer}/>
    )
};
