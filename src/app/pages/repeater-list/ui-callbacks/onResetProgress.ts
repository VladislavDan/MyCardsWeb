import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";

export const onResetProgress: ICallback<RepeaterListCallbackSettings, number> = (
    {services: {repeaterListService}},
    repeaterID = -1
) => {
    repeaterListService.resetProgressChannel.next(repeaterID);
}