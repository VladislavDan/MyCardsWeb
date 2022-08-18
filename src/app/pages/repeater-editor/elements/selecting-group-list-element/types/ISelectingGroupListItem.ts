import {ICardsGroup} from "../../../../../common/types/ICardsGroup";

export interface ISelectingGroupListItem {
    cardsGroup: ICardsGroup;
    onSelect: (id: number) => void;
    isSelected: boolean;
}