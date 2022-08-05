import React, {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {CardsRepeaterComponent} from './CardsRepeaterComponent';
import {AppContext} from '../../../App';
import {ICardRepeaterContainer} from "./types/ICardRepeaterContainer";
import {onDeleteCard} from "./ui-callbacks/onDeleteCard";
import {onDeleteSingleCardChannel} from "./channels-callbacks/onDeleteSingleCardChannel";
import {onCardGroupNameChannel} from "./channels-callbacks/onCardGroupNameChannel";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {onCardChannel} from "./channels-callbacks/onCardChannel";
import {onCardEditingChannel} from "./channels-callbacks/onCardEditingChannel";
import {onStatisticChannel} from "./channels-callbacks/onStatisticChannel";
import {onRepeatingResultChannel} from "./channels-callbacks/onRepeatingResultChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onClick} from "./ui-callbacks/onClick";
import {onClickCard} from "./ui-callbacks/onClickCard";
import {onBackClick} from "./ui-callbacks/onBackClick";
import {onSwitchEditing} from "./ui-callbacks/onSwitchEditing";
import {onChangeQuestion} from "./ui-callbacks/onChangeQuestion";
import {onChangeAnswer} from "./ui-callbacks/onChangeAnswer";
import {initialState} from "./defaults/initialState";
import {CardRepeaterCallbackSettings} from "./types/CardRepeaterCallbackSettings";

export const CardRepeaterContainer: FC<ICardRepeaterContainer> = (
    services
) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<CardRepeaterCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {
        state, context, services: {
            cardsRepeaterService, cardsEditorService
        }
    } = callbackSettings

    useChannel(cardsRepeaterService.deleteSingleCardChannel, callbackFactory(onDeleteSingleCardChannel))
    useChannel(cardsRepeaterService.cardGroupNameChannel, callbackFactory(onCardGroupNameChannel))
    useChannel(cardsRepeaterService.cardChannel, callbackFactory(onCardChannel));
    useChannel(cardsEditorService.cardEditingChannel, callbackFactory(onCardEditingChannel));
    useChannel(cardsRepeaterService.statisticChannel, callbackFactory(onStatisticChannel));
    useChannel(cardsRepeaterService.repeatingResultChannel, callbackFactory(onRepeatingResultChannel));

    useConstructor(callbackFactory(onConstructor));

    const click = useCallback(callbackFactory(onClick), []);
    const clickCard = useCallback(callbackFactory(onClickCard), []);
    const backClick = useCallback(callbackFactory(onBackClick), []);
    const switchEditing = useCallback(callbackFactory(onSwitchEditing), []);
    const changeQuestion = useCallback(callbackFactory(onChangeQuestion), []);
    const changeAnswer = useCallback(callbackFactory(onChangeAnswer), []);
    const deleteCard = useCallback(callbackFactory(onDeleteCard), [])

    return <CardsRepeaterComponent
        onDeleteCard={deleteCard}
        cardHeight={context.height * 0.55}
        isQuestionSide={state.isQuestionSide}
        onClickCard={clickCard}
        onClickYesNoButton={click}
        card={state.card}
        statistic={state.statistic}
        onBackClick={backClick}
        onSwitchEditing={switchEditing}
        isEditable={state.isEditable}
        onChangeQuestion={changeQuestion}
        onChangeAnswer={changeAnswer}
    />
};
