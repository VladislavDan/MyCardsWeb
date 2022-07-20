import {defaultFilterValue} from "../../../common/defaults/defaultFilterValue";

export const initialState = {
    cards: [],
    filter: defaultFilterValue,
    isEnabledSelecting: false,
    selectedItems: {},
    existedGroupsIDs: []
}