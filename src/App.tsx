import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, useHistory, Redirect
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
import {CardsGroupsListContainer} from './app/pages/cards-groups-list/CardsGroupsListContainer';
import {CardsListContainer} from './app/pages/cards-list/CardsListContainer';

export const AppContext = React.createContext<IAppContext>(defaultAppState);

function App() {

    const [appState, setAppState] = useState<IAppContext>(defaultAppState);

    const history = useHistory();

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
                                <Redirect exact from="/" to={Routs.cardsGroups.path} />
                                <Route path={Routs.cardsGroups.path}>
                                    <CardsGroupsListContainer/>
                                </Route>
                                <Route path={Routs.googleAuth.path}>
                                    <GoogleAuthContainer/>
                                </Route>
                                <Route path={Routs.googleBackups.path}>
                                    <GoogleBackupsContainer/>
                                </Route>
                                <Route path={Routs.cards.path}>
                                    <CardsListContainer/>
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
