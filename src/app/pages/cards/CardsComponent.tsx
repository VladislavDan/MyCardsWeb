import * as React from 'react';
import {FC} from 'react';
import {FilterComponent} from "./elements/filter/FilterComponent";
import {CardsListActions} from "./elements/cards-list-actions/CardsListActions";
import {ICardsComponent} from "./types/ICardsComponent";
import './CardsComponent.css';
import {CardsListComponent} from "./elements/cards-list/CardsListComponent";

export const CardsComponent: FC<ICardsComponent> = (
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
        height,
        onOpenRepeater,
        onStartSelecting,
        onSelectItem,
        onDeleteSelectedCards,
        onMovingSelectedCards,
        onCopySelectedCards,
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
            <CardsListComponent
                cards={cards}
                width={width}
                height={height}
                onEditItem={onEditItem}
                onDeleteItem={onDeleteItem}
                onResetProgress={onResetProgress}
                onClickItem={onClickItem}
                onSelectItem={onSelectItem}
                isEnabledSelecting={isEnabledSelecting}
                selectedItems={selectedItems}
            />
            <CardsListActions
                onOpenRepeater={onOpenRepeater}
                onOpenEditor={onOpenEditor}
                onStartSelecting={onStartSelecting}
                onCopySelectedCards={onCopySelectedCards}
                hideOpenEditorButton={isEnabledSelecting}
                hideOpenRepeaterButton={isEnabledSelecting}
                hideDeleteSelectedCardsButton={!isEnabledSelecting}
                hideMovingSelectedCardsButton={!isEnabledSelecting}
                hideCopySelectedCardButton={!isEnabledSelecting}
                onDeleteSelectedCards={onDeleteSelectedCards}
                onMovingSelectedCards={onMovingSelectedCards}
            />
        </>
    )
};
