import {List} from '@material-ui/core';
import * as React from 'react';
import {FC} from 'react';

import {CardsListItemComponent} from './elements/cards-list-item/CardsListItemComponent';
import {Card} from '../../../../types/Card';

export const CardsListComponent: FC<ICardsListComponent> = ({cards}) => {
    return (
        <List>
            {
                cards.map((card: Card) => {
                    return <CardsListItemComponent
                        key={card.id}
                        card={card}
                    />
                })
            }
        </List>
    )
};

interface ICardsListComponent {
    cards: Card[]
}
