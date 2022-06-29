import React, {FC, useCallback, useContext, useState} from "react";

import {ICard} from "../../common/types/ICard";
import {useHistory, useLocation} from "react-router";
import {INavigationState} from "../../common/types/INavigationState";
import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {IRepeatingArgs} from "../../common/types/IRepeatingArgs";
import {ICardsGroup} from "../../common/types/ICardsGroup";
import {IAppContext} from "../../common/types/IAppContext";
import {AppContext} from "../../../App";
import {Routs} from "../../common/Routs";
import {CardViewerComponent} from "./CardViewerComponent";
import {useConstructor} from "../../../MyTools/react-hooks/useConstructor";
import {initDefaultCard} from "../../common/logic/initDefaultCard";
import {ICardViewerContainer} from "./types/ICardViewerContainer";
import {CardViewerContainerState} from "./types/CardViewerContainerState";
import {CallbackFactory} from "../../../MyTools/react-utils/CallbackFactory";
import {onDeleteCard} from "./ui-callbacks/onDeleteCard";
import {useUnsubscribe} from "../../../MyTools/react-hooks/useUnsubscribe";
import {IRangeOfKnowledge} from "../../common/types/IRangeOfKnowledge";
import {onDeleteSingleCardChannel} from "./channels-callbacks/onDeleteSingleCardChannel";
import {onCardGroupNameChannel} from "./channels-callbacks/onCardGroupNameChannel";

export const CardViewerContainer: FC<ICardViewerContainer> = (services) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const {cardViewerService, cardsEditorService} = services

    const [state, setState] = useState<CardViewerContainerState>({
        card: {
            id: -1,
            question: '',
            answer: '',
            rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
            dateRepeating: 0
        },
        isQuestionSide: true,
        isEditable: false
    });

    const {setSubscription} = useUnsubscribe();

    const callbackSettings = {location, history, services, state, setState, context: {}, setSubscription}

    const callbackFactory = CallbackFactory(callbackSettings)

    useChannel(cardViewerService.deleteSingleCardChannel, callbackFactory(onDeleteSingleCardChannel))
    useChannel(cardViewerService.cardGroupNameChannel, callbackFactory(onCardGroupNameChannel))

    useChannel<number, ICard>(cardViewerService.cardChannel, (card: ICard) => {
        cardViewerService.cardGroupNameChannel.next(card.id)
        setState((prevState) => {
            return {
                ...prevState,
                card: card
            }
        });
    });

    useChannel<{ card: ICard, cardsGroupID: number }, ICard>(cardsEditorService.cardEditingChannel, (card: ICard) => {
        setState((prevState) => {
            return {
                ...prevState,
                card: card
            }
        });
    });

    useChannel<IRepeatingArgs, ICardsGroup[]>(cardViewerService.repeatingResultChannel, () => {
        cardViewerService.cardChannel.next(location.state.cardID);
    });

    useConstructor(() => {
        cardViewerService.cardChannel.next(location.state.cardID);
    })

    const value = useContext<IAppContext>(AppContext);

    const onClick = (isKnown: boolean) => {

        if (state.card) {
            cardViewerService.repeatingResultChannel.next({
                isKnown: isKnown,
                cardID: state.card.id,
                cardsGroupID: location.state.cardsGroupID
            });
        } else {
            setState({
                card: {
                    id: -1,
                    question: '',
                    answer: '',
                    rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
                    dateRepeating: 0
                },
                isQuestionSide: false,
                isEditable: false
            });
        }
    };

    const onClickCard = () => {
        if (!state.isEditable) {
            setState({
                ...state,
                isQuestionSide: !state.isQuestionSide
            })
        }
    };

    const onBackClick = () => {
        history.replace(Routs.cardsGroups.path);
    };

    const onSwitchEditing = () => {
        setState({
            ...state,
            isEditable: !state.isEditable
        });

        if (state.isEditable) {
            cardsEditorService.cardEditingChannel.next({
                card: state.card || initDefaultCard(),
                cardsGroupID: location.state.cardsGroupID
            })
        }
    };

    const onChangeQuestion = (question: string) => {
        if (state.card) {
            const editableCard = {
                ...state.card,
                question
            };

            setState({...state, card: editableCard});
        }
    };

    const onChangeAnswer = (answer: string) => {
        if (state.card) {
            const editableCard = {
                ...state.card,
                answer
            };

            setState({...state, card: editableCard});
        }
    };

    const deleteCard = useCallback(callbackFactory(onDeleteCard), [state.card])

    return <CardViewerComponent
        cardHeight={value.height * 0.55}
        isQuestionSide={state.isQuestionSide}
        onClickCard={onClickCard}
        onClick={onClick}
        card={state.card}
        onSwitchEditing={onSwitchEditing}
        isEditable={state.isEditable}
        onChangeQuestion={onChangeQuestion}
        onChangeAnswer={onChangeAnswer}
        onDeleteCard={deleteCard}
    />
}