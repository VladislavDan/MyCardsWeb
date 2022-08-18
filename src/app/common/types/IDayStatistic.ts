export interface IDayStatistic {
    date: number;
    month: number;
    year: number;
    inProgress: {
        [key: number]: number
    };
    done: {
        [key: number]: number
    };
}