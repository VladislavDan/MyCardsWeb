import React, {FC, useContext, useState} from "react";

import {CardViewerService} from "./CardViewerService";
import {ICard} from "../../types/ICard";
import {useHistory, useLocation} from "react-router";
import {INavigationState} from "../../types/INavigationState";
import {useChannel} from "../../../../MyTools/channel-conception/react-hooks/useChannel";
import {IRepeatingArgs} from "../../types/IRepeatingArgs";
import {ICardsGroup} from "../../types/ICardsGroup";
import {IAppContext} from "../../types/IAppContext";
import {AppContext} from "../../../App";
import {Routs} from "../../common/Routs";
import {CardsEditorService} from "../cards-editor/CardsEditorService";
import {CardViewerComponent} from "./CardViewerComponent";
import {useConstructor} from "../../../../MyTools/react-hooks/useConstructor";
import {initDefaultCard} from "../../common/logic/initDefaultCard";

export const CardViewerContainer: FC<ICardViewerContainer> = (
    {
        cardViewerService,
        cardsEditorService
    }
) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardViewerContainerState>({
        card: undefined,
        isQuestionSide: true,
        isEditable: false
    });

    useChannel<number, ICard | undefined>(cardViewerService.cardChannel, (card: ICard | undefined) => {
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
                card: undefined,
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

    return <CardViewerComponent
        cardHeight={value.height * 0.55}
        isQuestionSide={state.isQuestionSide}
        onClickCard={onClickCard}
        onClick={onClick}
        card={state.card}
        onBackClick={onBackClick}
        onSwitchEditing={onSwitchEditing}
        isEditable={state.isEditable}
        onChangeQuestion={onChangeQuestion}
        onChangeAnswer={onChangeAnswer}
    />
}

interface ICardViewerContainer {
    cardViewerService: CardViewerService;
    cardsEditorService: CardsEditorService;
}

interface CardViewerContainerState {
    card: ICard | undefined,
    isQuestionSide: boolean,
    isEditable: boolean,
}