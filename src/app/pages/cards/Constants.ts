import {defaultFilterValue} from "../../common/Constants";

export const initialState = {
    cards: [],
    filter: defaultFilterValue,
    isEnabledSelecting: false,
    selectedItems: {},
    existedGroupsIDs: []
}