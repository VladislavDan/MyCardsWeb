import {List} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';

import {CardsListItemComponent} from './elements/cards-list-item/CardsListItemComponent';
import {ICard} from '../../types/ICard';
import {AddButton} from '../../common/elements/add-button/AddButton';
import './CardsListComponent.css'

export const CardsListComponent: FC<ICardsListComponent> = ({cards, onOpenEditor}) => {
    return (
        <>
            <List className="cards">
                {
                    cards.map((card: ICard) => {
                        return <CardsListItemComponent
                            key={card.id}
                            card={card}
                        />
                    })
                }
            </List>
            <AddButton onClick={onOpenEditor}/>
        </>
    )
};

interface ICardsListComponent {
    cards: ICard[];
    onOpenEditor: () => void
}
