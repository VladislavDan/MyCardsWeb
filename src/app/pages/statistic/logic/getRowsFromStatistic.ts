import {IStatistic} from "../../../common/types/IStatistic";
import {IRow} from "../types/IRow";

export const getRowsFromStatistic = (statistic: IStatistic): IRow[] => {
    return statistic.dailyStatistic.reverse().map((
        {date, done, inProgress, year, month}
    ) => {
        let dateAsString = date > 0 && date < 10 ? '0' + date : date;
        month = month + 1;
        let monthAsString = month > 0 && month < 10 ? '0' + month : month;
        let inProgressSum: number = 0;
        Object.keys(inProgress).forEach((k) => {
            inProgressSum = inProgressSum + inProgress[Number(k)]
        })
        let doneSum: number = 0;
        Object.keys(done).forEach((k) => {
            doneSum = doneSum + done[Number(k)]
        })
        return {
            date: `${dateAsString}-${monthAsString}-${year}`,
            inProgress: inProgressSum,
            done: doneSum
        }
    })
}