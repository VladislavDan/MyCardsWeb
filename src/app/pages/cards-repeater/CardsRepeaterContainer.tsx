import {useHistory, useLocation} from 'react-router';
import React, {useState} from 'react';

import {useObservable} from '../../common/hooks/useObservable';
import {ICard} from '../../types/ICard';
import {useConstructor} from '../../common/hooks/useConstructor';
import {cardsRepeaterManager} from './CardsRepeaterService';
import {CardsRepeaterComponent} from './cards-repeater-component/CardsRepeterComponent';
import {Button} from '@material-ui/core';
import {Routs} from '../../common/Routs';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {CardsGroup} from '../../types/CardsGroup';
import {IStatistic} from '../../types/IStatistic';

export const CardRepeaterContainer = () => {

    const location = useLocation<string>();

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

    useObservable<string, ICard | undefined>(cardsRepeaterManager.cardChannel, (card: ICard | undefined) => {
        setState({
            card: card,
            isQuestionSide: true
        });
    });

    useObservable<string, IStatistic>(cardsRepeaterManager.statisticChannel, (statistic: IStatistic) => {
        setStatistic(statistic)
    });

    useObservable<IRepeatingArgs, CardsGroup[]>(cardsRepeaterManager.repeatingResultChannel, () => {
        cardsRepeaterManager.cardChannel.next(location.state);
        cardsRepeaterManager.statisticChannel.next(location.state);
    });

    useConstructor(() => {
        cardsRepeaterManager.cardChannel.next(location.state);
        cardsRepeaterManager.statisticChannel.next(location.state);
    });

    const onClick = (isKnown: boolean) => {

        if (state.card) {
            cardsRepeaterManager.repeatingResultChannel.next({
                isKnown: isKnown,
                cardID: state.card.id,
                cardsGroupID: location.state
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
