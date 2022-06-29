import * as React from 'react';
import {FC, ReactEventHandler, SyntheticEvent, useState} from 'react';

import {NavigationPanelComponent} from './NavigationPanelComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {INavigationPanelContainer} from "./types/INavigationPanelContainer";
import {NavigationPanelState} from "./types/NavigationPanelState";

export const NavigationPanelContainer: FC<INavigationPanelContainer> = (
    {
        navigationPanelService
    }
) => {

    const [state, setState] = useState<NavigationPanelState>({
        isOpen: false
    });

    useChannel<string, string>(navigationPanelService.navigationPanelOpenChannel, () => {
        setState({...state, isOpen: true});
    });

    const toggleDrawer = (isOpen: boolean): ReactEventHandler => (event: SyntheticEvent<Element, KeyboardEvent>) => {
        if (event && event.type === 'keydown' && (event.nativeEvent.key === 'Tab' || event.nativeEvent.key === 'Shift')) {
            return;
        }

        setState({...state, isOpen});
    };

    return (
        <NavigationPanelComponent isOpen={state.isOpen} toggleDrawer={toggleDrawer}/>
    )
};
