import {List} from '@material-ui/core';
import * as React from 'react';
import {FC} from 'react';

import {CardsListItemComponent} from './cards-list-item/CardsListItemComponent';
import {ICard} from '../../../types/ICard';

export const CardsListComponent: FC<ICardsListComponent> = ({cards}) => {
    return (
        <List>
            {
                cards.map((card: ICard) => {
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
    cards: ICard[]
}
