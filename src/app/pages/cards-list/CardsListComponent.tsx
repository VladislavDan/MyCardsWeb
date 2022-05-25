import {FixedSizeList as List} from 'react-window';
import * as React from 'react';
import {FC} from 'react';

import {CardsListItemComponent} from './elements/cards-list-item/CardsListItemComponent';
import {FilterComponent} from "./elements/filter/FilterComponent";
import {CardsListActions} from "./elements/cards-list-actions/CardsListActions";
import {ICardsListComponent} from "./types/ICardsListComponent";
import './CardsListComponent.css';

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
        width,
        onOpenRepeater,
        onStartSelecting,
        onSelectItem,
        onDeleteSelectedCards,
        onMovingSelectedCards,
        isEnabledSelecting,
        selectedItems
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
                                onSelect={onSelectItem}
                                isEnabledSelecting={isEnabledSelecting}
                                isSelected={selectedItems[card.id]}
                            />
                        </div>
                    }
                }
            </List>
            <CardsListActions
                onOpenRepeater={onOpenRepeater}
                onOpenEditor={onOpenEditor}
                onStartSelecting={onStartSelecting}
                hideOpenEditorButton={isEnabledSelecting}
                hideOpenRepeaterButton={isEnabledSelecting}
                hideDeleteSelectedCardsButton={!isEnabledSelecting}
                hideMovingSelectedCardsButton={!isEnabledSelecting}
                onDeleteSelectedCards={onDeleteSelectedCards}
                onMovingSelectedCards={onMovingSelectedCards}
            />
        </>
    )
};
