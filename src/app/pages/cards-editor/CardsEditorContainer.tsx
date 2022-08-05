import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {CardsEditorComponent} from './CardsEditorComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {ICardsEditorContainer} from "./types/ICardsEditorContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {onCardEditingChannel} from "./channels-callbacks/onCardEditingChannel";
import {onCardChannel} from "./channels-callbacks/onCardChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onChangeQuestion} from "./ui-callbacks/onChangeQuestion";
import {onChangeAnswer} from "./ui-callbacks/onChangeAnswer";
import {onSaveCard} from "./ui-callbacks/onSaveCard";
import {initialState} from "./defaults/initialState";
import {CardsEditorCallbackSettings} from "./types/CardsEditorCallbackSettings";

export const CardsEditorContainer: FC<ICardsEditorContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<CardsEditorCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {cardsEditorService}} = callbackSettings

    useChannel(cardsEditorService.cardEditingChannel, callbackFactory(onCardEditingChannel));
    useChannel(cardsEditorService.cardChannel, callbackFactory(onCardChannel));

    useConstructor(callbackFactory(onConstructor));

    const changeQuestion = useCallback(callbackFactory(onChangeQuestion), []);
    const changeAnswer = useCallback(callbackFactory(onChangeAnswer), []);
    const saveCard = useCallback(callbackFactory(onSaveCard), []);

    return <CardsEditorComponent
        question={state.card.question}
        answer={state.card.answer}
        onChangeQuestion={changeQuestion}
        onChangeAnswer={changeAnswer}
        onSaveCard={saveCard}
    />
};
