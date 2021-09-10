import React, {useState} from 'react';

import {ICard} from '../../types/ICard';
import {CardsListComponent} from './cards-list-component/CardsListComponent';
import {useObservable} from '../../common/hooks/useObservable';
import {cardsListManager} from './CardsListService';
import {useLocation} from 'react-router';
import {useConstructor} from '../../common/hooks/useConstructor';

export const CardsListContainer = () => {

    const location = useLocation<string>();

    const [state, setState] = useState<CardsListContainerState>({cards: []});

    useObservable(cardsListManager.cardsChannel, (cards: ICard[]) => {
        setState({
            cards: cards
        });
    });

    useConstructor(() => {
        cardsListManager.cardsChannel.next(location.state)
    });

    return <CardsListComponent cards={state.cards}/>
};

interface CardsListContainerState {
    cards: ICard[];
}
