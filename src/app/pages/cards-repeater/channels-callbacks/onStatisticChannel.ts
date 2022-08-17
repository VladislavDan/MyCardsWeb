import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {IRepeatingProgress} from "../../../common/types/IRepeatingProgress";
import {defaultRepeatingProgress} from "../../../common/defaults/defaultRepeatingProgress";

export const onStatisticChannel: ICallback<CardRepeaterCallbackSettings, IRepeatingProgress> = (
    {setState},
    statistic = defaultRepeatingProgress
) => {
    setState((prevState) => {
        return {
            ...prevState,
            repeatingProgress: statistic
        }
    })
}