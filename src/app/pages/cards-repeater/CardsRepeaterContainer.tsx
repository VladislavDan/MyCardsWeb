import {useLocation} from 'react-router';
import React, {useState} from 'react';

import {useSubscribe} from '../../common/hooks/useSubscribe';
import {ICard} from '../../types/ICard';
import {useFirstRender} from '../../common/hooks/useFirstRender';
import {cardsRepeaterManager} from './CardsRepeaterService';
import {CardsRepeaterComponent} from './cards-repeater-component/CardsRepeterComponent';

export const CardRepeaterContainer = () => {

    const location = useLocation<string>();

    const [state, setState] = useState<CardRepeaterContainerState>({card: undefined});

    useSubscribe<string, ICard | undefined>(cardsRepeaterManager.cardChannel, (card: ICard | undefined) => {
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
    card: ICard | undefined
}
