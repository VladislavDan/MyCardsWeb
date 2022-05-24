import {ISettings} from "../../../common/types/ISettings";

export interface ISettingsComponent {
    settings: ISettings
    onChangeAlgorithm: (isRandomAlgorithm: boolean) => void
    onChangeAutoObsolete: (isAutoObsolete: boolean) => void
    onChangeTimeInDone: (timeInDone: number) => void
    onChangeTimeInProgress: (timeInProgress: number) => void
}