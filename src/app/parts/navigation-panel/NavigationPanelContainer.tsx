import * as React from 'react';
import {FC, useCallback} from 'react';

import {NavigationPanelComponent} from './NavigationPanelComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {initialState} from './defaults/initialState';
import {onNavigationPanelOpenChannel} from './channels-callbacks/onNavigationPanelOpenChannel';
import {onToggleDrawer} from './ui-callbacks/onToggleDrawer';
import {NavigationPanelCallbackSettings} from './types/NavigationPanelCallbackSettings';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {NavigationPanelService} from './NavigationPanelService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const NavigationPanelContainer: FC = () => {

    const navigationPanelService = useDependencyContext<NavigationPanelService>(IDependenciesNames.NavigationPanelService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<NavigationPanelCallbackSettings>(
        initialState,
        {navigationPanelService},
        AppContext
    );

    const {state} = externalCallbackSettings

    useChannel(navigationPanelService.navigationPanelOpenChannel, callbackFactory(onNavigationPanelOpenChannel));

    const toggleDrawer = useCallback(callbackFactory(onToggleDrawer), []);

    return (
        <NavigationPanelComponent isOpen={state.isOpen} toggleDrawer={toggleDrawer}/>
    )
};
