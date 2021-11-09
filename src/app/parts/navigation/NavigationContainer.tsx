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
import {SpinnerService} from '../spinner-container/SpinnerService';
import {ConfirmDialogService} from '../confirm-dialog/ConfirmDialogService';


export const NavigationContainer: FC<INavigationContainer> = ({
                                                                  cardsGroupsListService,
                                                                  cardsGroupsEditorService,
                                                                  errorService,
                                                                  googleAuthService,
                                                                  googleBackupsService,
                                                                  spinnerService,
                                                                  confirmDialogService
                                                              }) => {

    return <Switch>
        <Redirect exact from="/" to={Routs.cardsGroups.path}/>
        <Route path={Routs.cardsGroups.path}>
            <CardsGroupsListContainer cardsGroupsListService={cardsGroupsListService} confirmDialogService={confirmDialogService}/>
        </Route>
        <Route path={Routs.googleAuth.path}>
            <GoogleAuthContainer googleAuthService={googleAuthService} errorService={errorService}/>
        </Route>
        <Route path={Routs.googleBackups.path}>
            <GoogleBackupsContainer googleBackupsService={googleBackupsService} spinnerService={spinnerService}/>
        </Route>
        <Route path={Routs.cards.path}>
            <CardsListContainer/>
        </Route>
        <Route path={Routs.cardsRepeater.path}>
            <CardRepeaterContainer/>
        </Route>
        <Route path={Routs.localBackups.path}>
            <LocalBackupsContainer/>
        </Route>
        <Route path={Routs.cardsGroupEditor.path}>
            <CardsGroupsEditorContainer cardsGroupsEditorService={cardsGroupsEditorService}/>
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
}
