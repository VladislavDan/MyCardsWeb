import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";

export const onStartRepeating: ICallback<RepeaterListCallbackSettings, number> = (
    {services: {repeaterListService}},
    repeaterID = -1
) => {
    repeaterListService.startRepeatingChannel.next(repeaterID);
}