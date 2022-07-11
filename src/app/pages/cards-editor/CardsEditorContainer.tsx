import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {CardsEditorComponent} from './CardsEditorComponent';
import {INavigationState} from '../../common/types/INavigationState';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {ICardsEditorContainer} from "./types/ICardsEditorContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {IAppContext} from "../../common/types/IAppContext";
import {AppContext} from "../../../App";
import {initialState} from "./Constants";
import {CardsEditorState} from "./types/CardsEditorState";
import {onCardEditingChannel} from "./channels-callbacks/onCardEditingChannel";
import {onSimplifiedCardsGroupsChannel} from "./channels-callbacks/onSimplifiedCardsGroupsChannel";
import {onCardChannel} from "./channels-callbacks/onCardChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onChangeQuestion} from "./ui-callbacks/onChangeQuestion";
import {onChangeAnswer} from "./ui-callbacks/onChangeAnswer";
import {onChangeCardsGroup} from "./ui-callbacks/onChangeCardsGroup";
import {onSaveCard} from "./ui-callbacks/onSaveCard";

export const CardsEditorContainer: FC<ICardsEditorContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<INavigationState, CardsEditorState, ICardsEditorContainer, IAppContext>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {cardsEditorService}} = callbackSettings

    useChannel(cardsEditorService.cardEditingChannel, callbackFactory(onCardEditingChannel));
    useChannel(cardsEditorService.simplifiedCardsGroupsChannel, callbackFactory(onSimplifiedCardsGroupsChannel));
    useChannel(cardsEditorService.cardChannel, callbackFactory(onCardChannel));

    useConstructor(callbackFactory(onConstructor));

    const changeQuestion = callbackFactory(onChangeQuestion);
    const changeAnswer = callbackFactory(onChangeAnswer);
    const changeCardsGroup = useCallback(callbackFactory(onChangeCardsGroup), []);
    const saveCard = useCallback(callbackFactory(onSaveCard), []);

    return <CardsEditorComponent
        question={state.card.question}
        answer={state.card.answer}
        onChangeQuestion={changeQuestion}
        onChangeAnswer={changeAnswer}
        onSaveCard={saveCard}
        currentCardsGroup={state.currentCardsGroup}
        cardsGroups={state.cardsGroups}
        onChangeCardsGroup={changeCardsGroup}
    />
};
