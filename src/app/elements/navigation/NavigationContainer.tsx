import * as React from 'react';
import {Redirect, Route, Switch} from 'react-router';

import {Routs} from '../../common/Routs';
import {CardsGroupsListContainer} from '../../pages/cards-groups-list/CardsGroupsListContainer';
import {GoogleAuthContainer} from '../../pages/google-auth/GoogleAuthContainer';
import {GoogleBackupsContainer} from '../../pages/google-backups/GoogleBackupsContainer';
import {CardsListContainer} from '../../pages/cards-list/CardsListContainer';
import {CardRepeaterContainer} from '../../pages/cards-repeater/CardsRepeaterContainer';
import {LocalBackupsContainer} from '../../pages/local-backup/LocalBackupsContainer';
import {CardsGroupsEditorContainer} from '../../pages/cards-groups-editor/CardsGroupsEditorContainer';
import {CardsGroupsEditorService} from '../../pages/cards-groups-editor/CardsGroupsEditorService';

export const NavigationContainer = () => {

    const cardsGroupsEditorService = new CardsGroupsEditorService();

    return <Switch>
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
        <Route path={Routs.cardsRepeater.path}>
            <CardRepeaterContainer/>
        </Route>
        <Route path={Routs.localBackups.path}>
            <LocalBackupsContainer/>
        </Route>
        <Route path={Routs.cardsGroupEditor.path}>
            <CardsGroupsEditorContainer service={cardsGroupsEditorService}/>
        </Route>
    </Switch>
};
