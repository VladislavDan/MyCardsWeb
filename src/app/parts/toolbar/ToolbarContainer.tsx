import React, {FC, useCallback, useEffect} from 'react';

import {ToolbarComponent} from './ToolbarComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {ToolbarCallbackSettings} from './types/ToolbarCallbackSettings';
import {onPageLabelChannel} from './channels-callbacks/onPageLabelChannel';
import {onClick} from './ui-callbacks/onClick';
import {useDependency} from '../../../MyTools/react-di/hooks/useDependency';
import {ToolbarService} from './ToolbarService';
import {NavigationPanelService} from '../navigation-panel/NavigationPanelService';
import {onLoadCardsCount} from './ui-callbacks/onLoadCardsCount';
import {initialState} from './defaults/initialState';
import {onCardsCountInGroupChannel} from './channels-callbacks/onCardsCountInGroupChannel';
import {onLoadLabel} from './ui-callbacks/onLoadLabel';

export const ToolbarContainer: FC = () => {

    const toolbarService = useDependency(ToolbarService);
    const navigationPanelService = useDependency(NavigationPanelService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<ToolbarCallbackSettings>(
        initialState,
        {toolbarService, navigationPanelService},
        AppContext
    );

    const {state, location} = externalCallbackSettings;

    useChannel(toolbarService.pageLabelChannel, callbackFactory(onPageLabelChannel))
    useChannel(toolbarService.cardsCountInGroupChannel, callbackFactory(onCardsCountInGroupChannel))

    useEffect(() => {
        callbackFactory(onLoadLabel)();
        callbackFactory(onLoadCardsCount)();
    }, [location.pathname]);

    const click = useCallback(callbackFactory(onClick), []);

    return (
        <ToolbarComponent pageLabel={state.label} onClick={click} cardsCount={state.cardsCount}/>
    )
};
