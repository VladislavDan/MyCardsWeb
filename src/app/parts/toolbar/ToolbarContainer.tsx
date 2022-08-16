import React, {FC, useCallback, useEffect} from 'react';

import {ToolbarComponent} from './ToolbarComponent';
import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {IToolbarContainer} from "./types/IToolbarContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {ToolbarCallbackSettings} from "./types/ToolbarCallbackSettings";
import {onToolbarExternalLabelChannel} from "./channels-callbacks/onToolbarExternalLabelChannel";
import {onPageLabelChannel} from "./channels-callbacks/onPageLabelChannel";
import {onClick} from "./ui-callbacks/onClick";

export const ToolbarContainer: FC<IToolbarContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<ToolbarCallbackSettings>(
        '',
        services,
        AppContext
    );

    const {services: {toolbarService, navigationPanelService}, state, location} = callbackSettings;

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
