import {ISettings} from "../../../common/types/ISettings";
import {IRepeatingType} from "../../../common/types/IRepeatingType";

export interface ISettingsComponent {
    settings: ISettings
    onChangeAlgorithm: (repeatingType: IRepeatingType) => void
    onChangeAutoObsolete: (isAutoObsolete: boolean) => void
    onChangeTimeInDone: (timeInDone: number) => void
    onChangeTimeInProgress: (timeInProgress: number) => void
}