import React, {FC, useEffect, useState} from 'react';
import * as H from 'history';
import {useLocation} from 'react-router-dom';

import {ToolbarComponent} from './ToolbarComponent';
import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {IToolbarContainer} from "./types/IToolbarContainer";

export const ToolbarContainer: FC<IToolbarContainer> = (
    {
        toolbarService,
        navigationPanelService
    }
) => {

    const location: H.Location = useLocation();
    const [pageLabel, setPageLabel] = useState('');

    useChannel(toolbarService.toolbarExternalLabelChannel, (label: string) => {
        setPageLabel(label)
    })

    useEffect(() => {
        const newPageLabel = toolbarService.getPageLabel(location.pathname);
        setPageLabel(newPageLabel);
    }, [location.pathname]);

    const onClick = () => {
        navigationPanelService.navigationPanelOpenChannel.next('');
    };

    return (
        <ToolbarComponent pageLabel={pageLabel} onClick={onClick}/>
    )
};
