import React, {FC, useCallback, useEffect} from 'react';

import {ToolbarComponent} from './ToolbarComponent';
import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {ToolbarCallbackSettings} from "./types/ToolbarCallbackSettings";
import {onToolbarExternalLabelChannel} from "./channels-callbacks/onToolbarExternalLabelChannel";
import {onPageLabelChannel} from "./channels-callbacks/onPageLabelChannel";
import {onClick} from "./ui-callbacks/onClick";
import {useDependency} from "../../../MyTools/react-di/hooks/useDependency";
import {ToolbarService} from "./ToolbarService";
import {NavigationPanelService} from "../navigation-panel/NavigationPanelService";

export const ToolbarContainer: FC = () => {

    const toolbarService = useDependency(ToolbarService);
    const navigationPanelService = useDependency(NavigationPanelService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<ToolbarCallbackSettings>(
        '',
        {toolbarService, navigationPanelService},
        AppContext
    );

    const {state, location} = externalCallbackSettings;

    useChannel(toolbarService.toolbarExternalLabelChannel, callbackFactory(onToolbarExternalLabelChannel))
    useChannel(toolbarService.pageLabelChannel, callbackFactory(onPageLabelChannel))

    useEffect(() => {
        toolbarService.pageLabelChannel.next(location.pathname);
    }, [location.pathname]);

    const click = useCallback(callbackFactory(onClick), []);

    return (
        <ToolbarComponent pageLabel={state} onClick={click}/>
    )
};
