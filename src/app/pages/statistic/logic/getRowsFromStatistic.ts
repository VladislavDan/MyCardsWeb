import {IStatistic} from "../../../common/types/IStatistic";
import {IRow} from "../types/IRow";

export const getRowsFromStatistic = (statistic: IStatistic): IRow[] => {
    return statistic.dailyStatistic.map((
        {date, done, inProgress, year, month}
    ) => {
        let dateAsString = date > 0 && date < 10 ? '0' + date : date;
        let monthAsString = month > 0 && month < 10 ? '0' + month : month;
        return {
            date: `${dateAsString}-${monthAsString}-${year}`,
            inProgress,
            done
        }
    })
}