import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {IRepeatingProgress} from "../../../common/types/IRepeatingProgress";
import {defaultStatisticValue} from "../../../common/defaults/defaultStatisticValue";

export const onStatisticChannel: ICallback<CardRepeaterCallbackSettings, IRepeatingProgress> = (
    {setState},
    statistic = defaultStatisticValue
) => {
    setState((prevState) => {
        return {
            ...prevState,
            repeatingProgress: statistic
        }
    })
}