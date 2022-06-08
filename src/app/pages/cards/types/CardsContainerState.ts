import {ICard} from "../../../common/types/ICard";
import {IFilter} from "../../../common/types/IFilter";

export interface CardsContainerState {
    cards: ICard[];
    filter: IFilter;
    isEnabledSelecting: boolean;
    selectedItems: {
        [key: number]: boolean
    };
    existedGroupsIDs: Array<{
        id: number;
        label: string;
    }>
}