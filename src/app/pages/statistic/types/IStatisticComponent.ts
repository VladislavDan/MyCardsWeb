import {IRow} from "./IRow";

export interface IStatisticComponent {
    rows: IRow[],
    onRemoveStatistic: () => void
}