import React, {useState} from 'react';

import {ICard} from '../../types/ICard';
import {CardsListComponent} from './cards-list-component/CardsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {cardsListManager} from './CardsListService';
import {useLocation} from 'react-router';
import {useConstructor} from '../../common/hooks/useConstructor';
import {INavigationState} from '../../types/INavigationState';

export const CardsListContainer = () => {

    const location = useLocation<INavigationState>();

    const [state, setState] = useState<CardsListContainerState>({cards: []});

    useChannel(cardsListManager.cardsChannel, (cards: ICard[]) => {
        setState({
            cards: cards
        });
    });

    useConstructor(() => {
        cardsListManager.cardsChannel.next(location.state.cardsGroupID)
    });

    return <CardsListComponent cards={state.cards}/>
};

interface CardsListContainerState {
    cards: ICard[];
}
