import {ICard} from "../../../../../common/types/ICard";

export interface ICardsListComponent {
    cards: ICard[];
    height: number;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
    onClickItem: (id: number) => void;
    onSelectItem: (id: number) => void;
    isEnabledSelecting: boolean;
    selectedItems: {
        [key: number]: boolean
    };
}