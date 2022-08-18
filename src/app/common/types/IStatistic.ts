import {IDayStatistic} from "./IDayStatistic";

export interface IStatistic {
    dailyStatistic: Array<IDayStatistic>;
    cardsInProgressFrequency: {
        [key: number]: number
    },
    cardsInDone: {
        [key: number]: number
    }
}