import {List} from '@mui/material';
import * as React from 'react';
import {FC} from 'react';

import {CardsListItemComponent} from './elements/cards-list-item/CardsListItemComponent';
import {ICard} from '../../types/ICard';
import {AddButton} from '../../common/elements/add-button/AddButton';
import './CardsListComponent.css'

export const CardsListComponent: FC<ICardsListComponent> = ({cards, onOpenEditor, onEditItem, onDeleteItem, onResetProgress, onClickItem}) => {
    return (
        <>
            <List className="cards">
                {
                    cards.map((card: ICard) => {
                        return <CardsListItemComponent
                            key={card.id}
                            card={card}
                            onEditItem={onEditItem}
                            onDeleteItem={onDeleteItem}
                            onResetProgress={onResetProgress}
                            onClickItem={onClickItem}
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
    onOpenEditor: () => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
    onClickItem: (id: number) => void;
}
