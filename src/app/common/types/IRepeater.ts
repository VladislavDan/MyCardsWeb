import {IStatistic} from "./IStatistic";
import {IRepeatingType} from "./IRepeatingType";

export interface IRepeater {
    id: number;
    cardsGroupsIDs: number[];
    autoObsolete: {
        isEnable: boolean;
        timeInProgress: number;
        timeInDone: number;
    };
    statistic: IStatistic;
    repeatingType: IRepeatingType
}