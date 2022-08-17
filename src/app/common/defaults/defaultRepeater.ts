import {IRepeater} from "../types/IRepeater";
import {IRepeatingType} from "../types/IRepeatingType";
import {defaultStatistic} from "./defaultStatistic";

export const defaultRepeater: IRepeater = {
    id: -1,
    cardsGroupsIDs: [],
    autoObsolete: {
        isEnable: false,
        timeInProgress: 7,
        timeInDone: 7
    },
    repeatingType: IRepeatingType.DEFAULT,
    statistic: defaultStatistic
}