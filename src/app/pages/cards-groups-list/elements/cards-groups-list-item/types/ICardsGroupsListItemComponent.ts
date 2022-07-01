import {ICardsGroup} from "../../../../../common/types/ICardsGroup";

export interface ICardsGroupsListItemComponent {
    cardsGroup: ICardsGroup;
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
}