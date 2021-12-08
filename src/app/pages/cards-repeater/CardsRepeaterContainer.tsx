import {useHistory, useLocation} from 'react-router';
import React, {FC, useContext, useState} from 'react';

import {useChannel} from '../../common/hooks/useChannel';
import {ICard} from '../../types/ICard';
import {useConstructor} from '../../common/hooks/useConstructor';
import {CardsRepeaterService} from './CardsRepeaterService';
import {CardsRepeaterComponent} from './CardsRepeaterComponent';
import {Routs} from '../../common/Routs';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IStatistic} from '../../types/IStatistic';
import {INavigationState} from '../../types/INavigationState';
import {AppContext} from '../../../App';
import {IAppContext} from '../../types/IAppContext';

export const CardRepeaterContainer: FC<ICardRepeaterContainer> = ({cardsRepeaterService}) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const defaultStatisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    const [state, setState] = useState<CardRepeaterContainerState>({
        card: undefined,
        isQuestionSide: true
    });

    const [statistic, setStatistic] = useState<IStatistic>(defaultStatisticValue);

    useChannel<{ cardsGroupID: number, cardID: number }, ICard | undefined>(cardsRepeaterService.cardChannel, (card: ICard | undefined) => {
        setState({
            card: card,
            isQuestionSide: true
        });
        cardsRepeaterService.statisticChannel.next('');
    });

    useChannel<string, ICard | undefined | null>(cardsRepeaterService.currentCardChannel, (card: ICard | undefined | null) => {

        if(card) {
            setState({
                card: card,
                isQuestionSide: true
            });
        }

        cardsRepeaterService.cardChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            cardID: location.state.cardID
        });
    });

    useChannel<string, IStatistic>(cardsRepeaterService.statisticChannel, (statistic: IStatistic) => {
        setStatistic(() => statistic)
    });

    useChannel<IRepeatingArgs, ICardsGroup[]>(cardsRepeaterService.repeatingResultChannel, () => {

        cardsRepeaterService.cardChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            cardID: location.state.cardID
        });
    });

    useConstructor(() => {
        cardsRepeaterService.currentCardChannel.next('');
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
                isQuestionSide: false
            });
        }
    };

    const onClickCard = () => {
        setState({
            ...state,
            isQuestionSide: !state.isQuestionSide
        })
    };

    const onEditCard = () => {
        if(state.card) {
            history.push({
                pathname: Routs.cardsEditor.path,
                state: {
                    cardsGroupID: location.state.cardsGroupID,
                    cardID: state.card.id
                }
            })
        }
    };

    const onBackClick = () => {
        history.replace(Routs.cardsGroups.path);
    };

    return <CardsRepeaterComponent
        answerCardHeight={value.height - 220}
        isQuestionSide={state.isQuestionSide}
        onClickCard={onClickCard}
        onClick={onClick}
        card={state.card}
        statistic={statistic}
        onEditCard={onEditCard}
        onBackClick={onBackClick}
    />
};

interface CardRepeaterContainerState {
    card: ICard | undefined,
    isQuestionSide: boolean
}

interface ICardRepeaterContainer {
    cardsRepeaterService: CardsRepeaterService;
}
