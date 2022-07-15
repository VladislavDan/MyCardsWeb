import {ICard} from "../../../common/types/ICard";
import {ISortVariant} from "../../../common/types/ISortVariant";
import {IFilter} from "../../../common/types/IFilter";

export interface ICardsComponent {
    cards: ICard[];
    onOpenEditor: () => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
    onClickItem: (id: number) => void;
    onSelectItem: (id: number) => void;
    onChangeSearchableText: (answer: string) => void;
    height: number;
    onChangeSorting: (sortVariant: ISortVariant) => void;
    filter: IFilter
    onOpenRepeater: () => void;
    onStartSelecting: () => void;
    isEnabledSelecting: boolean;
    selectedItems: {
        [key: number]: boolean
    };
    onMovingSelectedCards: () => void;
    onDeleteSelectedCards: () => void;
    onCopySelectedCards: () => void;
}