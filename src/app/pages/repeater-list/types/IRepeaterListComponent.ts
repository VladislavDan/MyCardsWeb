import {IRepeater} from "../../../common/types/IRepeater";

export interface IRepeaterListComponent {
    repeaters: IRepeater[];
    height: number;
    onOpenEditor: () => void;
    onStartRepeating: (repeaterID: number) => void;
    onDeleteRepeater: (repeaterID: number) => void;
    onResetProgress: (repeaterID: number) => void;
    onEditRepeater: (repeaterID: number) => void;
}