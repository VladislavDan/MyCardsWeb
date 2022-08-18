import {IRepeater} from "../../../common/types/IRepeater";

export interface IRepeaterListComponent {
    repeaters: IRepeater[];
    height: number;
    onOpenEditor: () => void;
}