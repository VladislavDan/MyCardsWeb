import {ICard} from "../../../common/types/ICard";
import {ISortVariants} from "../../../common/types/ISortVariants";
import {IFilter} from "../../../common/types/IFilter";

export interface ICardsListComponent {
    cards: ICard[];
    onOpenEditor: () => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
    onClickItem: (id: number) => void;
    onSelectItem: (id: number) => void;
    onChangeSearchableText: (answer: string) => void;
    height: number;
    width: number
    onChangeSorting: (sortVariant: ISortVariants) => void;
    filter: IFilter
    onOpenRepeater: () => void;
    onStartSelecting: () => void;
    isEnabledSelecting: boolean;
    selectedItems: {
        [key: number]: boolean
    };
    onMovingSelectedCards: () => void;
    onDeleteSelectedCards: () => void;
}