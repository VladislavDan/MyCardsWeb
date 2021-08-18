import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import {IAppContext} from './app/types/IAppContext';
import {ToolbarContainer} from './app/elements/toolbar-container/ToolbarContainer';
import {Routs} from './app/common/Routs';
import {NavigationPanelContainer} from './app/elements/navigation-panel-container/NavigationPanelContainer';
import {GoogleAuthContainer} from './app/pages/google-auth/GoogleAuthContainer';
import {ErrorContainer} from './app/elements/error-container/ErrorContainer';
import {SpinnerContainer} from './app/elements/spinner-container/SpinnerContainer';
import {GoogleBackupsContainer} from './app/pages/google-backups/GoogleBackupsContainer';
import {defaultAppState} from './app/common/Constants';
import {ConfirmDialogContainer} from './app/elements/confirm-dialog/ConfirmDialogContainer';

export const AppContext = React.createContext<IAppContext>(defaultAppState);

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
                            <Switch>
                                <Route path={Routs.googleAuth.path}>
                                    <GoogleAuthContainer/>
                                </Route>
                                <Route path={Routs.googleBackups.path}>
                                    <GoogleBackupsContainer/>
                                </Route>
                                <Route path="/users">
                                </Route>
                                <Route path="/">
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AppContext.Provider>
        </>
    );
}

export default App;
