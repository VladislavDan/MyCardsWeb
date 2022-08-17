import {defaultFilter} from "../../../common/defaults/defaultFilter";

export const initialState = {
    cards: [],
    filter: defaultFilter,
    isEnabledSelecting: false,
    selectedItems: {},
    existedGroupsIDs: []
}