import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {CardsGroupsEditorComponent} from './CardsGroupsEditorComponent';
import {INavigationState} from '../../common/types/INavigationState';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {ICardsGroupsEditorContainer} from "./types/ICardsGroupsEditorContainer";
import {CardsGroupsEditorState} from "./types/CardsGroupsEditorState";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {IAppContext} from "../../common/types/IAppContext";
import {AppContext} from "../../../App";
import {onChangeGroupName} from "./ui-callbacks/onChangeGroupName";
import {onSaveGroup} from "./ui-callbacks/onSaveGroup";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onGroupEditingChannel} from "./channels-callbacks/onGroupEditingChannel";
import {onGroupChannel} from "./channels-callbacks/onGroupChannel";
import {initialState} from './Constants'

export const CardsGroupsEditorContainer: FC<ICardsGroupsEditorContainer> = (
    services
) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<INavigationState, CardsGroupsEditorState, ICardsGroupsEditorContainer, IAppContext>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {cardsGroupsEditorService}} = callbackSettings

    useChannel(cardsGroupsEditorService.groupEditingChannel, callbackFactory(onGroupEditingChannel));
    useChannel(cardsGroupsEditorService.groupChannel, callbackFactory(onGroupChannel));

    useConstructor(callbackFactory(onConstructor));

    const changeGroupName = useCallback(callbackFactory(onChangeGroupName), [state.cardsGroup]);
    const saveGroup = callbackFactory(onSaveGroup);

    return <CardsGroupsEditorComponent
        groupName={state.cardsGroup.nameCardsGroup}
        onChangeGroupName={changeGroupName}
        onSaveGroup={saveGroup}
    />
};
