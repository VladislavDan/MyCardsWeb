import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {StatisticCallbackSettings} from "../types/StatisticCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onConstructor: ICallback<StatisticCallbackSettings, void> = (
    {services: {statisticService}}
) => {
    statisticService.statisticChannel.next(empty);
}