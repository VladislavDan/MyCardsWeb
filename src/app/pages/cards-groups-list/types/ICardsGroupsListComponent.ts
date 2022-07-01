import {ICardsGroup} from "../../../common/types/ICardsGroup";

export interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onOpenEditor: () => void;
    onResetProgress: (id: number) => void;
    height: number;
    width: number
}