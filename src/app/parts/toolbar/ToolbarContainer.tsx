import React, {ReactElement, useEffect, useState} from 'react';
import * as H from 'history';
import {useLocation} from 'react-router-dom';

import {toolbarManager} from './ToolbarService';
import {ToolbarComponent} from './ToolbarComponent';
import {navigationPanelService} from '../navigation-panel/NavigationPanelService';

export const ToolbarContainer = (): ReactElement => {

    const location: H.Location = useLocation();
    const [pageLabel, setPageLabel] = useState('');

    useEffect(() => {
        const newPageLabel = toolbarManager.getPageLabel(location.pathname);
        setPageLabel(newPageLabel);
    }, [location.pathname]);

    const onClick = () => {
        navigationPanelService.navigationPanelOpenChannel.next('');
    };

    return (
        <ToolbarComponent pageLabel={pageLabel} onClick={onClick}/>
    )
};
