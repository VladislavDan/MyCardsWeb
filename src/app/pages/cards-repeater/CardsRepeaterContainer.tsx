import {useHistory, useLocation} from 'react-router';
import React, {FC, useContext, useState} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ICard} from '../../common/types/ICard';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {CardsRepeaterService} from './CardsRepeaterService';
import {CardsRepeaterComponent} from './CardsRepeaterComponent';
import {Routs} from '../../common/Routs';
import {IRepeatingArgs} from '../../common/types/IRepeatingArgs';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {IStatistic} from '../../common/types/IStatistic';
import {INavigationState} from '../../common/types/INavigationState';
import {AppContext} from '../../../App';
import {IAppContext} from '../../common/types/IAppContext';
import {CardsEditorService} from '../cards-editor/CardsEditorService';
import {initDefaultCard} from "../../common/logic/initDefaultCard";

export const CardRepeaterContainer: FC<ICardRepeaterContainer> = ({cardsRepeaterService, cardsEditorService}) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const defaultStatisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    const [state, setState] = useState<CardRepeaterContainerState>({
        card: undefined,
        isQuestionSide: true,
        isEditable: false
    });

    const [statistic, setStatistic] = useState<IStatistic>(defaultStatisticValue);

    useChannel<number, ICard | undefined>(cardsRepeaterService.cardChannel, (card: ICard | undefined) => {
        setState({
            card: card,
            isQuestionSide: true,
            isEditable: false
        });
        cardsRepeaterService.statisticChannel.next('');
    });

    useChannel<{ card: ICard, cardsGroupID: number }, ICard>(cardsEditorService.cardEditingChannel, (card: ICard) => {
        setState((prevState) => {
            return {
                ...prevState,
                card: card
            }
        });
    });

    useChannel<number, ICard | null>(cardsRepeaterService.currentCardChannel, (card: ICard | null) => {

        if(card) {
            setState({
                card: card,
                isQuestionSide: true,
                isEditable: false
            });
        } else {
            cardsRepeaterService.cardChannel.next(location.state ? location.state.cardsGroupID : -1);
        }
    });

    useChannel<string, IStatistic>(cardsRepeaterService.statisticChannel, (statistic: IStatistic) => {
        setStatistic(() => statistic)
    });

    useChannel<IRepeatingArgs, ICardsGroup[]>(cardsRepeaterService.repeatingResultChannel, () => {

        cardsRepeaterService.cardChannel.next(location.state.cardsGroupID);
    });

    useConstructor(() => {
        if (location.state) {
            cardsRepeaterService.currentCardChannel.next(location.state.cardsGroupID);
        } else {
            cardsRepeaterService.currentCardChannel.next(null);
        }
        cardsRepeaterService.statisticChannel.next('');
    });

    const value = useContext<IAppContext>(AppContext);

    const onClick = (isKnown: boolean) => {

        if (state.card) {
            cardsRepeaterService.repeatingResultChannel.next({
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

    return <CardsRepeaterComponent
        cardHeight={value.height * 0.55}
        isQuestionSide={state.isQuestionSide}
        onClickCard={onClickCard}
        onClick={onClick}
        card={state.card}
        statistic={statistic}
        onBackClick={onBackClick}
        onSwitchEditing={onSwitchEditing}
        isEditable={state.isEditable}
        onChangeQuestion={onChangeQuestion}
        onChangeAnswer={onChangeAnswer}
    />
};

interface CardRepeaterContainerState {
    card: ICard | undefined,
    isQuestionSide: boolean,
    isEditable: boolean,
}

interface ICardRepeaterContainer {
    cardsRepeaterService: CardsRepeaterService;
    cardsEditorService: CardsEditorService;
}
