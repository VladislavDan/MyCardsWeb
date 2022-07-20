import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {IStatistic} from "../../../common/types/IStatistic";
import {defaultStatisticValue} from "../../../common/defaults/defaultStatisticValue";

export const onStatisticChannel: ICallback<CardRepeaterCallbackSettings, IStatistic> = (
    {setState},
    statistic = defaultStatisticValue
) => {
    setState((prevState) => {
        return {
            ...prevState,
            statistic
        }
    })
}