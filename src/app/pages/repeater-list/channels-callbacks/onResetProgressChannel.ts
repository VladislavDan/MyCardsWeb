import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onResetProgressChannel: ICallback<RepeaterListCallbackSettings, ICardsGroup[]> = (
    {services: {repeaterListService}}
) => {
    repeaterListService.repeaterListChannel.next(empty);
}