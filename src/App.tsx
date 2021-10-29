import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
import {IAppContext} from './app/types/IAppContext';
import {ToolbarContainer} from './app/parts/toolbar-container/ToolbarContainer';
import {NavigationPanelContainer} from './app/parts/navigation-panel-container/NavigationPanelContainer';
import {ErrorContainer} from './app/parts/error-container/ErrorContainer';
import {SpinnerContainer} from './app/parts/spinner-container/SpinnerContainer';
import {defaultAppState} from './app/common/Constants';
import {ConfirmDialogContainer} from './app/parts/confirm-dialog/ConfirmDialogContainer';
import {SpinnerService} from './app/parts/spinner-container/SpinnerService';
import {ErrorService} from './app/parts/error-container/ErrorService';
import {NavigationContainer} from './app/parts/navigation/NavigationContainer';

export const AppContext = React.createContext<IAppContext>(defaultAppState);

export const spinnerService = new SpinnerService();
export const errorService = new ErrorService();

function App() {

    const [appState, setAppState] = useState<IAppContext>(defaultAppState);

    useEffect(() => {
        const height = window.screen.height;
        const width = window.screen.width;
        if (appState.height !== height || appState.width !== width) {
            setAppState({...appState, height: window.screen.height, width: window.screen.width});
        }
    });

    return (
        <>
            <AppContext.Provider value={appState}>
                <Router>
                    <div>

                        <ErrorContainer/>

                        <ToolbarContainer/>

                        <NavigationPanelContainer/>

                        <ConfirmDialogContainer/>

                        <div className="page-container" style={{height: appState.height, width: appState.width}}>
                            <SpinnerContainer/>
                            <NavigationContainer/>
                        </div>
                    </div>
                </Router>
            </AppContext.Provider>
        </>
    );
}

export default App;
