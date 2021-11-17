import {useHistory, useLocation} from 'react-router';
import React, {useState} from 'react';

import {useChannel} from '../../common/hooks/useChannel';
import {ICard} from '../../types/ICard';
import {useConstructor} from '../../common/hooks/useConstructor';
import {cardsRepeaterManager} from './CardsRepeaterService';
import {CardsRepeaterComponent} from './CardsRepeterComponent';
import {Button} from '@mui/material';
import {Routs} from '../../common/Routs';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IStatistic} from '../../types/IStatistic';
import {INavigationState} from '../../types/INavigationState';

export const CardRepeaterContainer = () => {

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

    useChannel<number, ICard | undefined>(cardsRepeaterManager.cardChannel, (card: ICard | undefined) => {
        setState({
            card: card,
            isQuestionSide: true
        });
    });

    useChannel<number, IStatistic>(cardsRepeaterManager.statisticChannel, (statistic: IStatistic) => {
        setStatistic(statistic)
    });

    useChannel<IRepeatingArgs, ICardsGroup[]>(cardsRepeaterManager.repeatingResultChannel, () => {
        cardsRepeaterManager.cardChannel.next(location.state.cardsGroupID);
        cardsRepeaterManager.statisticChannel.next(location.state.cardsGroupID);
    });

    useConstructor(() => {
        cardsRepeaterManager.cardChannel.next(location.state.cardsGroupID);
        cardsRepeaterManager.statisticChannel.next(location.state.cardsGroupID);
    });

    const onClick = (isKnown: boolean) => {

        if (state.card) {
            cardsRepeaterManager.repeatingResultChannel.next({
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

    return state.card ?
        <CardsRepeaterComponent
            isQuestionSide={state.isQuestionSide}
            onClickCard={onClickCard}
            onClick={onClick}
            card={state.card}
            statistic={statistic}
        /> :
        <>
            <span>All cards repeated</span>
            <Button size="small" color="primary" onClick={() => history.replace(Routs.cardsGroups.path)}>
                Go back
            </Button>
        </>
};

interface CardRepeaterContainerState {
    card: ICard | undefined,
    isQuestionSide: boolean
}
