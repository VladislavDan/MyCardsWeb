import {FixedSizeList as List} from 'react-window';
import * as React from 'react';
import {FC} from 'react';

import {CardsListItemComponent} from './elements/cards-list-item/CardsListItemComponent';
import {ICard} from '../../types/ICard';
import {AddButton} from '../../common/elements/add-button/AddButton';
import './CardsListComponent.css'
import {FilterComponent} from "./elements/filter/FilterComponent";


export const CardsListComponent: FC<ICardsListComponent> = (
    {
        cards,
        onOpenEditor,
        onEditItem,
        onDeleteItem,
        onResetProgress,
        onClickItem,
        onChangeSearchableText,
        height,
        width
    }
) => {
    return (
        <>
            <FilterComponent onChangeSearchableText={onChangeSearchableText}/>
            <List
                className="cards"
                itemData={cards}
                itemSize={55}
                itemCount={cards.length}
                overscanCount={5}
                height={height}
                width={width}
            >
                {({index, style}: any) => {
                    const card = cards[index];
                    return <div style={style}><CardsListItemComponent
                        key={card.id}
                        card={card}
                        onEditItem={onEditItem}
                        onDeleteItem={onDeleteItem}
                        onResetProgress={onResetProgress}
                        onClickItem={onClickItem}
                    /></div>
                }
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
    onChangeSearchableText: (answer: string) => void;
    height: number;
    width: number
}
