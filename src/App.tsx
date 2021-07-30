import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core';

import './App.css';
import {IAppContext} from './app/types/IAppContext';
import {ToolbarComponent} from './app/organism/toolbar-component/ToolbarComponent';
import {Routs} from './app/common/Routs';

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

                    <ToolbarComponent/>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">
                                    Default page
                                </Link>
                            </li>
                            <li>
                                <Link to={Routs.googleAuth.path}>
                                    {Routs.googleAuth.name}
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <Switch>
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
