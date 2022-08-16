import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {IRepeatingProgress} from "../../../common/types/IRepeatingProgress";
import {defaultRepeatingProgressValue} from "../../../common/defaults/defaultRepeatingProgressValue";

export const onStatisticChannel: ICallback<CardRepeaterCallbackSettings, IRepeatingProgress> = (
    {setState},
    statistic = defaultRepeatingProgressValue
) => {
    setState((prevState) => {
        return {
            ...prevState,
            repeatingProgress: statistic
        }
    })
}