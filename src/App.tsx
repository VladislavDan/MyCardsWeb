import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import './App.css';
import {IAppContext} from './app/common/types/IAppContext';
import {ToolbarContainer} from './app/parts/toolbar/ToolbarContainer';
import {NavigationPanelContainer} from './app/parts/navigation-panel/NavigationPanelContainer';
import {ErrorContainer} from './app/parts/error-container/ErrorContainer';
import {SpinnerContainer} from './app/parts/spinner/SpinnerContainer';
import {defaultAppState, STORE_NAME} from './app/common/Constants';
import {ConfirmDialogContainer} from './app/parts/confirm-dialog/ConfirmDialogContainer';
import {SpinnerService} from './app/parts/spinner/SpinnerService';
import {ErrorService} from './app/parts/error-container/ErrorService';
import {NavigationContainer} from './app/parts/navigation/NavigationContainer';
import {CardsGroupsEditorService} from './app/pages/cards-groups-editor/CardsGroupsEditorService';
import {CardsGroupsListService} from './app/pages/cards-groups-list/CardsGroupsListService';
import {ConfirmDialogService} from './app/parts/confirm-dialog/ConfirmDialogService';
import {GoogleAuthService} from './app/pages/google-auth/GoogleAuthService';
import {GoogleBackupsService} from './app/pages/google-backups/GoogleBackupsService';
import {CardsEditorService} from './app/pages/cards-editor/CardsEditorService';
import {StorageService} from './app/common/services/StorageService';
import {CardsService} from './app/pages/cards/CardsService';
import {CardsRepeaterService} from './app/pages/cards-repeater/CardsRepeaterService';
import {LocalBackupsService} from './app/pages/local-backup/LocalBackupsService';
import {DataBaseService} from './app/common/services/DataBaseService';
import {SettingsService} from './app/pages/settings/SettingsService';
import {CardViewerService} from "./app/pages/card-viewer/CardViewerService";
import {SelectionDialogContainer} from "./app/parts/selection-dialog/SelectionDialogContainer";
import {SelectionDialogService} from "./app/parts/selection-dialog/SelectionDialogService";
import {NavigationPanelService} from "./app/parts/navigation-panel/NavigationPanelService";
import {ToolbarService} from "./app/parts/toolbar/ToolbarService";
import {Channel} from "./MyTools/channel-conception/Channel";

export const AppContext = React.createContext<IAppContext>(defaultAppState);

const errorService = new ErrorService();
const spinnerService = new SpinnerService();

const confirmDialogService = new ConfirmDialogService();
const selectionDialogService = new SelectionDialogService();
const navigationPanelService = new NavigationPanelService();
const toolbarService = new ToolbarService();

const dataBaseService = new DataBaseService(STORE_NAME);
const storageService = new StorageService(dataBaseService);
const cardsGroupsEditorService = new CardsGroupsEditorService(storageService);
const cardsGroupsListService = new CardsGroupsListService(storageService);
const googleAuthService = new GoogleAuthService(storageService);
const googleBackupsService = new GoogleBackupsService(storageService);
const cardsEditorService = new CardsEditorService(storageService);
const cardsListService = new CardsService(storageService);
const cardsRepeaterService = new CardsRepeaterService(storageService);
const localBackupsService = new LocalBackupsService(storageService);
const settingService = new SettingsService(storageService);
const cardViewerService = new CardViewerService(storageService);

Channel.setGlobalErrorHandler((error) => {
    console.error(error);
})

function App() {

    const [appState, setAppState] = useState<IAppContext>(defaultAppState);

    useEffect(() => {
        const height = window.screen.height;
        const width = window.screen.width;
        if (appState.height !== height || appState.width !== width) {
            setAppState({...appState, height: height, width: width});
        }
    }, [appState]);

    return (
        <>
            <AppContext.Provider value={appState}>
                <Router>
                    <div>

                        <ErrorContainer errorService={errorService}/>

                        <ToolbarContainer
                            toolbarService={toolbarService}
                            navigationPanelService={navigationPanelService}
                        />

                        <NavigationPanelContainer navigationPanelService={navigationPanelService}/>

                        <ConfirmDialogContainer confirmDialogService={confirmDialogService}/>

                        <SelectionDialogContainer selectionDialogService={selectionDialogService}/>

                        <div className="page-container" style={{height: appState.height - 110, width: appState.width}}>
                            <SpinnerContainer spinnerService={spinnerService}/>
                            <NavigationContainer
                                toolbarService={toolbarService}
                                cardsGroupsListService={cardsGroupsListService}
                                cardsGroupsEditorService={cardsGroupsEditorService}
                                googleAuthService={googleAuthService}
                                googleBackupsService={googleBackupsService}
                                errorService={errorService}
                                spinnerService={spinnerService}
                                confirmDialogService={confirmDialogService}
                                cardsEditorService={cardsEditorService}
                                cardsListService={cardsListService}
                                cardsRepeaterService={cardsRepeaterService}
                                localBackupsService={localBackupsService}
                                settingsService={settingService}
                                cardViewerService={cardViewerService}
                                selectionDialogService={selectionDialogService}
                            />
                        </div>
                    </div>
                </Router>
            </AppContext.Provider>
        </>
    );
}

export default App;
