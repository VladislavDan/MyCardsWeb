import * as React from 'react';
import {FC} from 'react';
import {Redirect, Route, Switch} from 'react-router';

import {Routs} from '../../common/Routs';
import {CardsGroupsListContainer} from '../../pages/cards-groups-list/CardsGroupsListContainer';
import {GoogleAuthContainer} from '../../pages/google-auth/GoogleAuthContainer';
import {GoogleBackupsContainer} from '../../pages/google-backups/GoogleBackupsContainer';
import {CardsListContainer} from '../../pages/cards-list/CardsListContainer';
import {CardRepeaterContainer} from '../../pages/cards-repeater/CardsRepeaterContainer';
import {LocalBackupsContainer} from '../../pages/local-backup/LocalBackupsContainer';
import {CardsGroupsEditorContainer} from '../../pages/cards-groups-editor/CardsGroupsEditorContainer';
import {CardsGroupsListService} from '../../pages/cards-groups-list/CardsGroupsListService';
import {CardsGroupsEditorService} from '../../pages/cards-groups-editor/CardsGroupsEditorService';
import {ErrorService} from '../error-container/ErrorService';
import {GoogleAuthService} from '../../pages/google-auth/GoogleAuthService';
import {GoogleBackupsService} from '../../pages/google-backups/GoogleBackupsService';
import {SpinnerService} from '../spinner/SpinnerService';
import {ConfirmDialogService} from '../confirm-dialog/ConfirmDialogService';
import {CardsEditorContainer} from '../../pages/cards-editor/CardsEditorContainer';
import {CardsEditorService} from '../../pages/cards-editor/CardsEditorService';
import {CardsListService} from '../../pages/cards-list/CardsListService';
import {CardsRepeaterService} from '../../pages/cards-repeater/CardsRepeaterService';
import {LocalBackupsService} from '../../pages/local-backup/LocalBackupsService';
import {SettingsContainer} from '../../pages/settings/SettingsContainer';
import {SettingsService} from '../../pages/settings/SettingsService';
import {CardViewerContainer} from "../../pages/card-viewer/CardViewerContainer";
import {CardViewerService} from "../../pages/card-viewer/CardViewerService";


export const NavigationContainer: FC<INavigationContainer> = (
    {
        cardsGroupsListService,
        cardsGroupsEditorService,
        errorService,
        googleAuthService,
        googleBackupsService,
        spinnerService,
        confirmDialogService,
        cardsEditorService,
        cardsListService,
        cardsRepeaterService,
        settingsService,
        localBackupsService,
        cardViewerService
    }
) => {

    return <Switch>
        <Redirect exact from="/MyCardsWeb" to={Routs.cardsGroups.path}/>
        <Redirect exact from="/" to={Routs.cardsGroups.path}/>
        <Route path={Routs.cardsGroups.path}>
            <CardsGroupsListContainer cardsGroupsListService={cardsGroupsListService}
                                      confirmDialogService={confirmDialogService}/>
        </Route>
        <Route path={Routs.googleAuth.path}>
            <GoogleAuthContainer googleAuthService={googleAuthService} errorService={errorService}/>
        </Route>
        <Route path={Routs.googleBackups.path}>
            <GoogleBackupsContainer googleBackupsService={googleBackupsService} spinnerService={spinnerService}
                                    confirmDialogService={confirmDialogService}/>
        </Route>
        <Route path={Routs.cards.path}>
            <CardsListContainer cardsListService={cardsListService} confirmDialogService={confirmDialogService}/>
        </Route>
        <Route path={Routs.cardsRepeater.path}>
            <CardRepeaterContainer cardsRepeaterService={cardsRepeaterService} cardsEditorService={cardsEditorService}/>
        </Route>
        <Route path={Routs.localBackups.path}>
            <LocalBackupsContainer localBackupsService={localBackupsService} confirmDialogService={confirmDialogService}
                                   spinnerService={spinnerService}/>
        </Route>
        <Route path={Routs.cardsGroupEditor.path}>
            <CardsGroupsEditorContainer cardsGroupsEditorService={cardsGroupsEditorService}/>
        </Route>
        <Route path={Routs.cardsEditor.path}>
            <CardsEditorContainer cardsEditorService={cardsEditorService}/>
        </Route>
        <Route path={Routs.settings.path}>
            <SettingsContainer settingsService={settingsService}/>
        </Route>
        <Route path={Routs.cardViewer.path}>
            <CardViewerContainer
                cardViewerService={cardViewerService}
                cardsEditorService={cardsEditorService}
            />
        </Route>
    </Switch>
};

interface INavigationContainer {
    cardsGroupsListService: CardsGroupsListService;
    cardsGroupsEditorService: CardsGroupsEditorService;
    errorService: ErrorService;
    googleAuthService: GoogleAuthService;
    googleBackupsService: GoogleBackupsService;
    spinnerService: SpinnerService;
    confirmDialogService: ConfirmDialogService;
    cardsEditorService: CardsEditorService;
    cardsListService: CardsListService;
    cardsRepeaterService: CardsRepeaterService;
    localBackupsService: LocalBackupsService;
    settingsService: SettingsService;
    cardViewerService: CardViewerService;
}
