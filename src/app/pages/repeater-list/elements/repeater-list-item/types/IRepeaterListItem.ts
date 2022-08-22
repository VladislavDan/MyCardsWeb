import {IRepeater} from "../../../../../common/types/IRepeater";

export interface IRepeaterListItem {
    repeater: IRepeater;
    onStartRepeating: (repeaterID: number) => void;
    onDeleteRepeater: (repeaterID: number) => void;
}