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
import {CardsGroupsEditorService} from './app/pages/cards-groups-editor/CardsGroupsEditorService';
import {CardsGroupsListService} from './app/pages/cards-groups-list/CardsGroupsListService';
import {ConfirmDialogService} from './app/parts/confirm-dialog/ConfirmDialogService';
import {GoogleAuthService} from './app/pages/google-auth/GoogleAuthService';
import {GoogleBackupsService} from './app/pages/google-backups/GoogleBackupsService';
import {CardsEditorService} from './app/pages/cards-editor/CardsEditorService';
import {LocalStorageService} from './app/common/services/LocalStoragService';
import {CardsListService} from './app/pages/cards-list/CardsListService';
import {CardsRepeaterService} from './app/pages/cards-repeater/CardsRepeaterService';
import {LocalBackupsService} from './app/pages/local-backup/LocalBackupsService';

export const AppContext = React.createContext<IAppContext>(defaultAppState);

const errorService = new ErrorService();
const spinnerService = new SpinnerService();

const confirmDialogService= new ConfirmDialogService();

const localStorageService = new LocalStorageService();
const cardsGroupsEditorService = new CardsGroupsEditorService(localStorageService);
const cardsGroupsListService = new CardsGroupsListService(localStorageService);
const googleAuthService = new GoogleAuthService(localStorageService);
const googleBackupsService = new GoogleBackupsService(localStorageService);
const cardsEditorService = new CardsEditorService(localStorageService);
const cardsListService = new CardsListService(localStorageService);
const cardsRepeaterService = new CardsRepeaterService(localStorageService);
const localBackupsService = new  LocalBackupsService(localStorageService);

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

                        <ErrorContainer errorService={errorService}/>

                        <ToolbarContainer/>

                        <NavigationPanelContainer/>

                        <ConfirmDialogContainer confirmDialogService={confirmDialogService}/>

                        <div className="page-container" style={{height: appState.height, width: appState.width}}>
                            <SpinnerContainer spinnerService={spinnerService}/>
                            <NavigationContainer
                                cardsGroupsListService={cardsGroupsListService}
                                cardsGroupsEditorService={cardsGroupsEditorService}
                                googleAuthService={googleAuthService}
                                googleBackupsService={googleBackupsService}
                                errorService={errorService}
                                spinnerService={spinnerService}
                                confirmDialogService={confirmDialogService}
                                cardsEditorService={cardsEditorService}
                                localStorageService={localStorageService}
                                cardsListService={cardsListService}
                                cardsRepeaterService={cardsRepeaterService}
                                localBackupsService={localBackupsService}
                            />
                        </div>
                    </div>
                </Router>
            </AppContext.Provider>
        </>
    );
}

export default App;
