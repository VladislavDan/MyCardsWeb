import React, {ReactElement, useEffect, useState} from 'react';
import * as H from 'history';
import {useLocation} from 'react-router-dom';

import {toolbarManager} from './ToolbarService';
import {ToolbarComponent} from './toolbar-component/ToolbarComponent';
import {navigationPanelService} from '../navigation-panel-container/NavigationPanelService';

export const ToolbarContainer = (): ReactElement => {

    const location: H.Location = useLocation();
    const [pageLabel, setPageLabel] = useState('');

    useEffect(() => {
        const newPageLabel = toolbarManager.getPageLabel(location.pathname);
        setPageLabel(newPageLabel);
    });

    const onClick = () => {
        navigationPanelService.navigationPanelOpenChannel.next('');
    };

    return (
        <ToolbarComponent pageLabel={pageLabel} onClick={onClick}/>
    )
};
