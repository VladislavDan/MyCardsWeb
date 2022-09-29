import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";
import {IRepeater} from "../../../common/types/IRepeater";

export const onRepeaterListChannel: ICallback<RepeaterListCallbackSettings, IRepeater[]> = (
    {setState, services: {repeaterListService}},
    repeaters = []
) => {
    setState((prevState) => {
        return {
            ...prevState,
            repeaters
        }
    })
}