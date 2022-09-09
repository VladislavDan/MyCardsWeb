import React, {FC, useCallback} from "react";

import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {AppContext} from "../../../App";
import {CardViewerComponent} from "./CardViewerComponent";
import {useConstructor} from "../../../MyTools/react-hooks/useConstructor";
import {ICardViewerContainer} from "./types/ICardViewerContainer";
import {onDeleteCard} from "./ui-callbacks/onDeleteCard";
import {onDeleteSingleCardChannel} from "./channels-callbacks/onDeleteSingleCardChannel";
import {onCardGroupNameChannel} from "./channels-callbacks/onCardGroupNameChannel";
import {onChangeAnswer} from "./ui-callbacks/onChangeAnswer";
import {onChangeQuestion} from "./ui-callbacks/onChangeQuestion";
import {onSwitchEditing} from "./ui-callbacks/onSwitchEditing";
import {onClickYesNoButton} from "./ui-callbacks/onClickYesNoButton";
import {onClickCard} from "./ui-callbacks/onClickCard";
import {onCardChannel} from "./channels-callbacks/onCardChannel";
import {onCardEditingChannel} from "./channels-callbacks/onCardEditingChannel";
import {onRepeatingResultChannel} from "./channels-callbacks/onRepeatingResultChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {initialState} from "./defaults/initialState";
import {CardViewerCallbackSettings} from "./types/CardViewerCallbackSettings";
import {onReadByVoiceEngine} from "./ui-callbacks/onReadByVoiceEngine";
import {onReadByVoiceEngineChannel} from "./channels-callbacks/onReadByVoiceEngineChannel";

export const CardViewerContainer: FC<ICardViewerContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<CardViewerCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, context, services: {cardViewerService, cardsEditorService}} = callbackSettings

    useChannel(cardViewerService.deleteSingleCardChannel, callbackFactory(onDeleteSingleCardChannel))
    useChannel(cardViewerService.cardGroupNameChannel, callbackFactory(onCardGroupNameChannel))
    useChannel(cardViewerService.cardChannel, callbackFactory(onCardChannel));
    useChannel(cardsEditorService.cardEditingChannel, callbackFactory(onCardEditingChannel));
    useChannel(cardViewerService.repeatingResultChannel, callbackFactory(onRepeatingResultChannel));
    useChannel(cardViewerService.readByVoiceEngineChannel, callbackFactory(onReadByVoiceEngineChannel));

    useConstructor(callbackFactory(onConstructor))

    const clickCard = useCallback(callbackFactory(onClickCard), [])
    const clickYesNoButton = useCallback(callbackFactory(onClickYesNoButton), [])
    const switchEditing = useCallback(callbackFactory(onSwitchEditing), [])
    const changeQuestion = useCallback(callbackFactory(onChangeQuestion), [])
    const changeAnswer = useCallback(callbackFactory(onChangeAnswer), [])
    const deleteCard = useCallback(callbackFactory(onDeleteCard), [])
    const readByVoiceEngine = useCallback(callbackFactory(onReadByVoiceEngine), [])

    return <CardViewerComponent
        onReadByVoiceEngine={readByVoiceEngine}
        cardHeight={context.height * 0.55}
        isQuestionSide={state.isQuestionSide}
        onClickCard={clickCard}
        onClickYesNoButton={clickYesNoButton}
        card={state.card}
        onSwitchEditing={switchEditing}
        isEditable={state.isEditable}
        onChangeQuestion={changeQuestion}
        onChangeAnswer={changeAnswer}
        onDeleteCard={deleteCard}
    />
}