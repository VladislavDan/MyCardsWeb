export interface StatisticData {
    id: number,
    dayOfWeek: string,
    day: string,
    isWeekend: boolean,
    comment: string,
    result: {
        isChecked: boolean
    }
}