import {useLocation} from 'react-router';
import React, {useState} from 'react';

import {useSubscribe} from '../../common/hooks/useSubscribe';
import {ICard} from '../../types/ICard';
import {useFirstRender} from '../../common/hooks/useFirstRender';
import {cardsRepeaterManager} from './CardsRepeaterManager';
import {CardsRepeaterComponent} from './cards-repeater-component/CardsRepeterComponent';

export const CardRepeaterContainer = () => {

    const location = useLocation();

    const [state, setState] = useState<CardRepeaterContainerState>({card: null});

    useSubscribe(cardsRepeaterManager.cardChannel, (card: ICard) => {
        setState({
            card: card
        });
    });

    useFirstRender(() => {
        cardsRepeaterManager.cardChannel.next(location.state)
    });

    return state.card ? <CardsRepeaterComponent card={state.card}/> : <span>All cards repeated</span>
};

interface CardRepeaterContainerState {
    card: ICard | null
}
