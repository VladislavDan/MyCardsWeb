import {FixedSizeList as List} from 'react-window';
import * as React from 'react';
import {FC} from 'react';

import {CardsListItemComponent} from './elements/cards-list-item/CardsListItemComponent';
import {ICard} from '../../types/ICard';
import './CardsListComponent.css'
import {FilterComponent} from "./elements/filter/FilterComponent";
import {ISortVariants} from "../../types/ISortVariants";
import {IFilter} from "../../types/IFilter";
import {CardsListActions} from "./elements/cards-list-actions/CardsListActions";


export const CardsListComponent: FC<ICardsListComponent> = (
    {
        cards,
        filter,
        onOpenEditor,
        onEditItem,
        onDeleteItem,
        onResetProgress,
        onClickItem,
        onChangeSearchableText,
        onChangeSorting,
        height,
        width
    }
) => {
    return (
        <>
            <FilterComponent
                onChangeSearchableText={onChangeSearchableText}
                onChangeSorting={onChangeSorting}
                filter={filter}
            />
            <List
                className="cards"
                itemData={cards}
                itemSize={55}
                itemCount={cards.length}
                overscanCount={5}
                height={55 * cards.length}
                width={width}
            >
                {
                    ({index, style}: any) => {
                        const card = cards[index];
                        return <div style={style}>
                            <CardsListItemComponent
                                key={card.id}
                                card={card}
                                onEditItem={onEditItem}
                                onDeleteItem={onDeleteItem}
                                onResetProgress={onResetProgress}
                                onClickItem={onClickItem}
                                onSelect={() => {
                                }}
                                isEnabledSelecting={true}
                                isSelected={false}
                            />
                        </div>
                    }
                }
            </List>
            <CardsListActions onOpenEditor={onOpenEditor}/>
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
    onChangeSorting: (sortVariant: ISortVariants) => void;
    filter: IFilter
}
