import {IRepeater} from "../types/IRepeater";

export const defaultRepeater: IRepeater = {
    id: -1,
    cardsGroupsIDs: [],
    autoObsolete: {
        isEnable: false,
        timeInProgress: 7,
        timeInDone: 7
    },
    name: ''
}