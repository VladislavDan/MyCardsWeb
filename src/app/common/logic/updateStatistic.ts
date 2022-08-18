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
            if (dailyStatistic.done[args.cardID]) {
                dailyStatistic.done[args.cardID] = dailyStatistic.done[args.cardID] + 1;
            } else {
                dailyStatistic.done[args.cardID] = 1;
            }
        } else {
            if (dailyStatistic.inProgress[args.cardID]) {
                dailyStatistic.inProgress[args.cardID] = dailyStatistic.inProgress[args.cardID] + 1;
            } else {
                dailyStatistic.inProgress[args.cardID] = 1;
            }
        }
    } else {
        statistic.dailyStatistic.push({
            date,
            year,
            month,
            inProgress: args.isKnown ? {} : {[args.cardID]: 1},
            done: args.isKnown ? {[args.cardID]: 1} : {}
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