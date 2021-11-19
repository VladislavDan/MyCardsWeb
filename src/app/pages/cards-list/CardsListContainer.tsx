import React, {FC, useState} from 'react';

import {ICard} from '../../types/ICard';
import {CardsListComponent} from './CardsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {CardsListService} from './CardsListService';
import {useHistory, useLocation} from 'react-router';
import {useConstructor} from '../../common/hooks/useConstructor';
import {INavigationState} from '../../types/INavigationState';
import {Routs} from '../../common/Routs';

export const CardsListContainer: FC<ICardsListContainer> = ({cardsListService}) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardsListContainerState>({cards: []});

    useChannel(cardsListService.cardsChannel, (cards: ICard[]) => {
        setState({
            cards: cards
        });
    });

    useConstructor(() => {
        cardsListService.cardsChannel.next(location.state.cardsGroupID)
    });

    const onOpenEditor = () => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: {
                cardsGroupID: location.state.cardsGroupID
            }
        })
    };

    const onEditItem = (cardID: number) => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: {
                cardsGroupID: location.state.cardsGroupID,
                cardID: cardID
            }
        })
    };

    const onDeleteItem = (cardID: number) => {

    };

    const onResetProgress = (cardID: number) => {

    };

    const onClickItem = (cardID: number) => {
        history.push({
            pathname: Routs.cardsRepeater.path,
            state: {
                cardsGroupID: location.state.cardsGroupID,
                cardID: cardID
            }
        })
    };

    return <CardsListComponent
        cards={state.cards}
        onOpenEditor={onOpenEditor}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onResetProgress={onResetProgress}
        onClickItem={onClickItem}
    />
};

interface CardsListContainerState {
    cards: ICard[];
}

interface ICardsListContainer {
    cardsListService: CardsListService
}
