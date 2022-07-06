import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {IFilter} from "../../../common/types/IFilter";

export interface CardsGroupsListContainerState {
    cardsGroups: ICardsGroup[];
    filter: IFilter;
}