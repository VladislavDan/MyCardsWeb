import * as React from 'react';
import {FC} from 'react';
import {Redirect, Route, Switch} from 'react-router';

import {Routs} from '../../common/Routs';
import {CardsGroupsListContainer} from '../../pages/cards-groups-list/CardsGroupsListContainer';
import {GoogleAuthContainer} from '../../pages/google-auth/GoogleAuthContainer';
import {GoogleBackupsContainer} from '../../pages/google-backups/GoogleBackupsContainer';
import {CardsContainer} from '../../pages/cards/CardsContainer';
import {CardRepeaterContainer} from '../../pages/cards-repeater/CardsRepeaterContainer';
import {LocalBackupsContainer} from '../../pages/local-backup/LocalBackupsContainer';
import {CardsGroupsEditorContainer} from '../../pages/cards-groups-editor/CardsGroupsEditorContainer';
import {CardsEditorContainer} from '../../pages/cards-editor/CardsEditorContainer';
import {SettingsContainer} from '../../pages/settings/SettingsContainer';
import {CardViewerContainer} from "../../pages/card-viewer/CardViewerContainer";
import {INavigationContainer} from "./types/INavigationContainer";
import {StatisticContainer} from "../../pages/statistic/StatisticContainer";
import {RepeaterEditorContainer} from "../../pages/repeater-editor/RepeaterEditorContainer";
import {RepeaterListContainer} from "../../pages/repeater-list/RepeaterListContainer";


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
        cardViewerService,
        selectionDialogService,
        toolbarService,
        statisticService,
        repeaterListService,
        repeaterEditorService
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
            <CardsContainer
                cardsListService={cardsListService}
                confirmDialogService={confirmDialogService}
                selectionDialogService={selectionDialogService}
            />
        </Route>
        <Route path={Routs.cardsRepeater.path}>
            <CardRepeaterContainer
                toolbarService={toolbarService}
                cardsRepeaterService={cardsRepeaterService}
                cardsEditorService={cardsEditorService}
                confirmDialogService={confirmDialogService}
            />
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
                toolbarService={toolbarService}
                confirmDialogService={confirmDialogService}
                cardViewerService={cardViewerService}
                cardsEditorService={cardsEditorService}
            />
        </Route>
        <Route path={Routs.statistic.path}>
            <StatisticContainer
                confirmDialogService={confirmDialogService}
                statisticService={statisticService}
            />
        </Route>
        <Route path={Routs.repeaterEditor.path}>
            <RepeaterEditorContainer repeaterEditorService={repeaterEditorService}/>
        </Route>
        <Route path={Routs.repeaterList.path}>
            <RepeaterListContainer
                repeaterListService={repeaterListService}
                confirmDialogService={confirmDialogService}
            />
        </Route>
    </Switch>
};
