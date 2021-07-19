import * as fns from "date-fns";

export function getTodayWithoutTime(): number {
    return fns.getTime(fns.startOfToday());
}
