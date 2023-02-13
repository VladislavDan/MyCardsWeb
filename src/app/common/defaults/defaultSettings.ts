import {ISettings} from '../types/ISettings';
import {IRepeatingType} from '../types/IRepeatingType';

export const defaultSettings: ISettings = {
    repeatingType: IRepeatingType.DEFAULT,
    autoObsolete: {
        isEnable: false,
        timeInDone: 7,
        timeInProgress: 7
    },
    difficultCardsAmountForRepeating: 15
}