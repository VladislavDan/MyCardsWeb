import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {CardsGroupsEditorComponent} from './CardsGroupsEditorComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {onChangeGroupName} from "./ui-callbacks/onChangeGroupName";
import {onSaveGroup} from "./ui-callbacks/onSaveGroup";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onGroupEditingChannel} from "./channels-callbacks/onGroupEditingChannel";
import {onGroupChannel} from "./channels-callbacks/onGroupChannel";
import {initialState} from "./defaults/initialState";
import {ICardsGroupsEditorCallbackSettings} from "./types/ICardsGroupsEditorCallbackSettings";
import {useDependency} from "../../../MyTools/react-di/hooks/useDependency";
import {CardsGroupsEditorService} from "./CardsGroupsEditorService";

export const CardsGroupsEditorContainer: FC = () => {

    const cardsGroupsEditorService = useDependency(CardsGroupsEditorService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<ICardsGroupsEditorCallbackSettings>(
        initialState,
        {cardsGroupsEditorService},
        AppContext
    );

    const {state} = externalCallbackSettings;

    useChannel(cardsGroupsEditorService.groupEditingChannel, callbackFactory(onGroupEditingChannel));
    useChannel(cardsGroupsEditorService.groupChannel, callbackFactory(onGroupChannel));

    useConstructor(callbackFactory(onConstructor));

    const changeGroupName = useCallback(callbackFactory(onChangeGroupName), []);
    const saveGroup = useCallback(callbackFactory(onSaveGroup), []);

    return <CardsGroupsEditorComponent
        groupName={state.cardsGroup.nameCardsGroup}
        onChangeGroupName={changeGroupName}
        onSaveGroup={saveGroup}
    />
};
