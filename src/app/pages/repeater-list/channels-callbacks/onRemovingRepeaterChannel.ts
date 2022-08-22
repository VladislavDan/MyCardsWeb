import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";
import {IRepeater} from "../../../common/types/IRepeater";

export const onRemovingRepeaterChannel: ICallback<RepeaterListCallbackSettings, IRepeater[]> = (
    {services: {repeaterListService}}
) => {
    repeaterListService.repeaterListChannel.next(empty);
}