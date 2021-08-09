import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import './App.css';
import {IAppContext} from './app/types/IAppContext';
import {ToolbarContainer} from './app/organism/toolbar-container/ToolbarContainer';
import {Routs} from './app/common/Routs';
import {NavigationPanelContainer} from './app/organism/navigation-panel-container/NavigationPanelContainer';
import {GoogleAuthComponent} from './app/pages/google-auth/GoogleAuthComponent';

export const AppContext = React.createContext<IAppContext>({
    cards: [],
    updateContext: () => {
    }
});

function App() {

    const [appState, setAppState] = useState<IAppContext>({
        cards: [],
        updateContext: () => {
        }
    });

    useEffect(() => {

    });

    return (
        <>
            <Router>
                <div>

                    <ToolbarContainer/>

                    <NavigationPanelContainer/>

                    <Switch>
                        <Route path={Routs.googleAuth.path}>
                            <GoogleAuthComponent/>
                        </Route>
                        <Route path="/about">
                            <AppContext.Provider value={appState}></AppContext.Provider>
                        </Route>
                        <Route path="/users">
                            <AppContext.Provider value={appState}></AppContext.Provider>
                        </Route>
                        <Route path="/">
                            <AppContext.Provider value={appState}></AppContext.Provider>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    );
}

export default App;
