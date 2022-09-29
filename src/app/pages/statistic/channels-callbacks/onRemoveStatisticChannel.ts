import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {StatisticCallbackSettings} from "../types/StatisticCallbackSettings";
import {initialState} from "../defaults/initialState";
import {IStatistic} from "../../../common/types/IStatistic";

export const onRemoveStatisticChannel: ICallback<StatisticCallbackSettings, IStatistic> = (
    {setState}
) => {
    setState(() => {
        return initialState;
    })
}