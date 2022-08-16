import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {StatisticCallbackSettings} from "../types/StatisticCallbackSettings";

export const onConstructor: ICallback<StatisticCallbackSettings, void> = (
    {services: {statisticService}}
) => {
    statisticService.statisticChannel.next('');
}