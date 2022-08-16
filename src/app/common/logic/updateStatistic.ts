import {IRepeatingArgs} from "../types/IRepeatingArgs";
import {IStatistic} from "../types/IStatistic";

export const updateStatistic = (statistic: IStatistic, args: IRepeatingArgs): IStatistic => {

    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let foundDayIndex = statistic.dailyStatistic.findIndex((dayStatistic) => {
        return dayStatistic.date === date && dayStatistic.year === year && dayStatistic.month === month
    });

    if (foundDayIndex >= 0) {
        let dailyStatistic = statistic.dailyStatistic[foundDayIndex];
        if (args.isKnown) {
            dailyStatistic.done = dailyStatistic.done + 1;
        } else {
            dailyStatistic.inProgress = dailyStatistic.inProgress + 1;
        }
    } else {
        statistic.dailyStatistic.push({
            date,
            year,
            month,
            inProgress: args.isKnown ? 0 : 1,
            done: args.isKnown ? 1 : 0
        });
    }
    if (!args.isKnown) {
        if (statistic.cardsInProgressFrequency[args.cardID]) {
            statistic.cardsInProgressFrequency[args.cardID] = statistic.cardsInProgressFrequency[args.cardID] + 1;
        } else {
            statistic.cardsInProgressFrequency[args.cardID] = 1;
        }
    }

    return statistic;
}