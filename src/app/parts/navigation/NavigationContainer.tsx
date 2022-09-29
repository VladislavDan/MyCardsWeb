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
import {StatisticContainer} from "../../pages/statistic/StatisticContainer";
import {RepeaterEditorContainer} from "../../pages/repeater-editor/RepeaterEditorContainer";
import {RepeaterListContainer} from "../../pages/repeater-list/RepeaterListContainer";


export const NavigationContainer: FC = () => {

    return <Switch>
        <Redirect exact from="/MyCardsWeb" to={Routs.cardsGroups.path}/>
        <Redirect exact from="/" to={Routs.cardsGroups.path}/>
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
            <CardsContainer/>
        </Route>
        <Route path={Routs.cardsRepeater.path}>
            <CardRepeaterContainer/>
        </Route>
        <Route path={Routs.localBackups.path}>
            <LocalBackupsContainer/>
        </Route>
        <Route path={Routs.cardsGroupEditor.path}>
            <CardsGroupsEditorContainer/>
        </Route>
        <Route path={Routs.cardsEditor.path}>
            <CardsEditorContainer/>
        </Route>
        <Route path={Routs.settings.path}>
            <SettingsContainer/>
        </Route>
        <Route path={Routs.cardViewer.path}>
            <CardViewerContainer/>
        </Route>
        <Route path={Routs.statistic.path}>
            <StatisticContainer/>
        </Route>
        <Route path={Routs.repeaterEditor.path}>
            <RepeaterEditorContainer/>
        </Route>
        <Route path={Routs.repeaterList.path}>
            <RepeaterListContainer/>
        </Route>
    </Switch>
};
