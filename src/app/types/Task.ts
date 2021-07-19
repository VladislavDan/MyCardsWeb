import {CheckedPoint} from "./CheckedPoint";

export interface Task {
    id: number,
    name: string,
    description: string,
    comment: string,
    dateStart: number,
    dateEnd: number,
    checkedPoints: Array<CheckedPoint>,
    important: number,
    minutesADay: number,
    isCompleted: boolean,
    daysOfRepeating: Array<number>,
    isRepeatInDayOfMonth: boolean
}
