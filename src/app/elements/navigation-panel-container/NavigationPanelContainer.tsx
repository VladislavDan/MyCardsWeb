import * as React from 'react';
import {ReactEventHandler, SyntheticEvent, useState} from 'react';

import {navigationPanelManager} from './NavigationPanelManager';
import {NavigationPanelComponent} from './elements/NavigationPanelComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';

export const NavigationPanelContainer = () => {

    const [state, setState] = useState<INavigationPanelState>({
        isOpen: false
    });

    useSubscribe<void>(navigationPanelManager.navigationPanelOpenChannel, () => {
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

interface INavigationPanelState {
    isOpen: boolean;
}
