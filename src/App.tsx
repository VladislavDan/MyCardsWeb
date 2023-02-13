import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import {IAppContext} from './app/common/types/IAppContext';
import {ToolbarContainer} from './app/parts/toolbar/ToolbarContainer';
import {NavigationPanelContainer} from './app/parts/navigation-panel/NavigationPanelContainer';
import {ErrorContainer} from './app/parts/error-dialog/ErrorContainer';
import {SpinnerContainer} from './app/parts/spinner/SpinnerContainer';
import {ConfirmDialogContainer} from './app/parts/confirm-dialog/ConfirmDialogContainer';
import {NavigationContainer} from './app/parts/navigation/NavigationContainer';
import {SelectionDialogContainer} from './app/parts/selection-dialog/SelectionDialogContainer';
import {Channel} from './MyTools/channel-conception/Channel';
import {defaultAppState} from './app/common/defaults/defaultAppState';
import {DependenciesProvider} from './MyTools/react-di/DependenciesProvider';
import {Dependencies} from './Dependencies';

export const AppContext = React.createContext<IAppContext>(defaultAppState);

Channel.setGlobalErrorHandler((error) => {
    console.error(error);
})

function App() {

    const [appState, setAppState] = useState<IAppContext>(defaultAppState);

    useEffect(() => {
        const height = window.screen.height;
        if (appState.height !== height) {
            setAppState({...appState, height});
        }
    }, [appState]);

    return (
        <>
            <DependenciesProvider functions={Dependencies}>
                <AppContext.Provider value={appState}>
                    <Router>
                        <div>
                            <ErrorContainer/>
                            <ToolbarContainer/>
                            <NavigationPanelContainer/>
                            <ConfirmDialogContainer/>
                            <SelectionDialogContainer/>
                            <div className="page-container" style={{height: appState.height - 110, width: '100%'}}>
                                <SpinnerContainer/>
                                <NavigationContainer/>
                            </div>
                        </div>
                    </Router>
                </AppContext.Provider>
            </DependenciesProvider>
        </>
    );
}

export default App;
