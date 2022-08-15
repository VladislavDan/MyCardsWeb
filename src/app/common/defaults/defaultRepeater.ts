import {IRepeater} from "../types/IRepeater";

export const defaultRepeater: IRepeater = {
    cardsGroupsIDs: [],
    autoObsolete: {
        isEnable: false,
        timeInProgress: 7,
        timeInDone: 7
    },
    isRandomRepeating: false
}