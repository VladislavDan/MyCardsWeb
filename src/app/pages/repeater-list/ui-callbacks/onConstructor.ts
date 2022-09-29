import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onConstructor: ICallback<RepeaterListCallbackSettings, void> = (
    {services: {repeaterListService}}
) => {
    repeaterListService.repeaterListChannel.next(empty);
}