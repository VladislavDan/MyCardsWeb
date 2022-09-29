import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {StatisticCallbackSettings} from "../types/StatisticCallbackSettings";
import {IRow} from "../types/IRow";

export const onStatisticChannel: ICallback<StatisticCallbackSettings, IRow[]> = (
    {setState},
    rows = []
) => {
    setState((prevState) => {
        return {
            ...prevState,
            rows
        }
    })
}