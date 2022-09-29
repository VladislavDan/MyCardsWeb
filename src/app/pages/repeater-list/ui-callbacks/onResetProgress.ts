import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";

export const onResetProgress: ICallback<RepeaterListCallbackSettings, number> = (
    {services: {repeaterListService}},
    repeaterID = -1
) => {
    repeaterListService.resetProgressChannel.next(repeaterID);
}