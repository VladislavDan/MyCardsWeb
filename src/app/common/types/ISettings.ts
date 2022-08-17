import {IRepeatingType} from "./IRepeatingType";

export interface ISettings {
    repeatingType: IRepeatingType;
    autoObsolete: {
        isEnable: boolean;
        timeInProgress: number;
        timeInDone: number;
    }
}
