import React, {useState} from 'react';

import {ICard} from '../../types/ICard';
import {CardsListComponent} from './CardsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {cardsListManager} from './CardsListService';
import {useHistory, useLocation} from 'react-router';
import {useConstructor} from '../../common/hooks/useConstructor';
import {INavigationState} from '../../types/INavigationState';
import {Routs} from '../../common/Routs';

export const CardsListContainer = () => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardsListContainerState>({cards: []});

    useChannel(cardsListManager.cardsChannel, (cards: ICard[]) => {
        setState({
            cards: cards
        });
    });

    useConstructor(() => {
        cardsListManager.cardsChannel.next(location.state.cardsGroupID)
    });

    const onOpenEditor = () => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: {
                cardsGroupID: location.state.cardsGroupID
            }
        })
    };

    return <CardsListComponent cards={state.cards} onOpenEditor={onOpenEditor}/>
};

interface CardsListContainerState {
    cards: ICard[];
}
