import {ISortVariants} from "../../common/types/ISortVariants";

export const initialState = {
    cards: [],
    filter: {
        searchableText: '',
        sort: ISortVariants.NONE,
    },
    isEnabledSelecting: false,
    selectedItems: {},
    existedGroupsIDs: []
}