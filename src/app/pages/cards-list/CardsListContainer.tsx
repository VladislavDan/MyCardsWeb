import React, {useState} from 'react';

import {Card} from '../../types/Card';
import {CardsListComponent} from './elements/cards-list-component/CardsListComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {cardsListManager} from './CardsListManager';
import {useLocation} from 'react-router';
import {useFirstRender} from '../../common/hooks/useFirstRender';

export const CardsListContainer = () => {

    const location = useLocation();

    const [state, setState] = useState<CardsListContainerState>({cards: []});

    useSubscribe(cardsListManager.cardsChannel, (cards: Card[]) => {
        setState({
            cards: cards
        });
    });

    useFirstRender(() => {
        cardsListManager.cardsChannel.next(location.state)
    });

    return <CardsListComponent cards={state.cards}/>
};

interface CardsListContainerState {
    cards: Card[];
}
