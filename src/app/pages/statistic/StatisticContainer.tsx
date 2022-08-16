import {StatisticComponent} from "./StatisticComponent";
import {IStatisticContainer} from "./types/IStatisticContainer";
import {FC, useCallback} from "react";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {StatisticCallbackSettings} from "./types/StatisticCallbackSettings";
import {initialState} from "./defaults/initialState";
import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {onStatisticChannel} from "./channels-callbacks/onStatisticChannel";
import {useConstructor} from "../../../MyTools/react-hooks/useConstructor";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onRemoveStatistic} from "./ui-callbacks/onRemoveStatistic";
import {onRemoveStatisticChannel} from "./channels-callbacks/onRemoveStatisticChannel";

export const StatisticContainer: FC<IStatisticContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<StatisticCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {services: {statisticService}, state} = callbackSettings

    useChannel(statisticService.statisticChannel, callbackFactory(onStatisticChannel));
    useChannel(statisticService.removeStatisticChannel, callbackFactory(onRemoveStatisticChannel));

    useConstructor(callbackFactory(onConstructor))

    const removeStatistic = useCallback(callbackFactory(onRemoveStatistic), [])

    return <StatisticComponent rows={state.rows} onRemoveStatistic={removeStatistic}/>
}