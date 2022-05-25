import {ICard} from "../../../../../common/types/ICard";

export interface ICardListItemComponent {
    card: ICard;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
    onClickItem: (id: number) => void;
    onSelect: (id: number) => void;
    isEnabledSelecting: boolean;
    isSelected: boolean
}