import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";

export const onRemoveRepeater: ICallback<RepeaterListCallbackSettings, number> = (
    {services: {repeaterListService}},
    repeaterID = -1
) => {
    repeaterListService.removingRepeaterChannel.next(repeaterID);
}