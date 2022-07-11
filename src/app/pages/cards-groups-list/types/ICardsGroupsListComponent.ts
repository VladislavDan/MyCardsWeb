import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {IFilter} from "../../../common/types/IFilter";
import {ISortVariant} from "../../../common/types/ISortVariant";

export interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onOpenEditor: () => void;
    onResetProgress: (id: number) => void;
    onChangeSearchableText: (searchableText: string) => void;
    onChangeSorting: (sortVariant: ISortVariant) => void;
    filter: IFilter;
    height: number;
    width: number
}