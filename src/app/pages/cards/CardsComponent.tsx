import * as React from 'react';
import {FC} from 'react';
import {FilterComponent} from "../../common/elements/filter/FilterComponent";
import {CardsListActions} from "./elements/cards-list-actions/CardsListActions";
import {ICardsComponent} from "./types/ICardsComponent";
import './CardsComponent.css';
import {CardsListComponent} from "./elements/cards-list/CardsListComponent";
import {ISortVariant} from "../../common/types/ISortVariant";

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
                    sortVariants={[
                            ISortVariant.NONE,
                            ISortVariant.DATE_ASK,
                            ISortVariant.DATE_DESK,
                            ISortVariant.QUESTION_ASK,
                            ISortVariant.QUESTION_DESK,
                            ISortVariant.STATUS_ASK,
                            ISortVariant.STATUS_DESK,
                            ISortVariant.ANSWER_ASK,
                            ISortVariant.ANSWER_DESK
                    ]}
                />
                <CardsListComponent
                    cards={cards}
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
