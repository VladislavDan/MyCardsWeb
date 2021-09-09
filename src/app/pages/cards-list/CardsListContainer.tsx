import React, {useState} from 'react';

import {ICard} from '../../types/ICard';
import {CardsListComponent} from './cards-list-component/CardsListComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {cardsListManager} from './CardsListService';
import {useLocation} from 'react-router';
import {useFirstRender} from '../../common/hooks/useFirstRender';

export const CardsListContainer = () => {

    const location = useLocation<string>();

    const [state, setState] = useState<CardsListContainerState>({cards: []});

    useSubscribe(cardsListManager.cardsChannel, (cards: ICard[]) => {
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
    cards: ICard[];
}
