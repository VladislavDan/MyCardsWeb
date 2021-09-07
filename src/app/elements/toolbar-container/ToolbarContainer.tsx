import React, {ReactElement, useEffect, useState} from 'react';
import * as H from 'history';
import {useLocation} from 'react-router-dom';

import {toolbarManager} from './ToolbarService';
import {ToolbarComponent} from './elements/toolbar-component/ToolbarComponent';
import {navigationPanelManager} from '../navigation-panel-container/NavigationPanelManager';

export const ToolbarContainer = (): ReactElement => {

    const location: H.Location = useLocation();
    const [pageLabel, setPageLabel] = useState('');

    useEffect(() => {
        const newPageLabel = toolbarManager.getPageLabel(location.pathname);
        setPageLabel(newPageLabel);
    });

    const onClick = () => {
        navigationPanelManager.navigationPanelOpenChannel.next();
    };

    return (
        <ToolbarComponent pageLabel={pageLabel} onClick={onClick}/>
    )
};
