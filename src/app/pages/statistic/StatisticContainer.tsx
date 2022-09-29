import {StatisticComponent} from "./StatisticComponent";
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
import {useDependency} from "../../../MyTools/react-di/hooks/useDependency";
import {StatisticService} from "./StatisticService";
import {ConfirmDialogService} from "../../parts/confirm-dialog/ConfirmDialogService";

export const StatisticContainer: FC = () => {

    const statisticService = useDependency(StatisticService);
    const confirmDialogService = useDependency(ConfirmDialogService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<StatisticCallbackSettings>(
        initialState,
        {statisticService, confirmDialogService},
        AppContext
    );

    const {state} = externalCallbackSettings;

    useChannel(statisticService.statisticChannel, callbackFactory(onStatisticChannel));
    useChannel(statisticService.removeStatisticChannel, callbackFactory(onRemoveStatisticChannel));

    useConstructor(callbackFactory(onConstructor))

    const removeStatistic = useCallback(callbackFactory(onRemoveStatistic), [])

    return <StatisticComponent rows={state.rows} onRemoveStatistic={removeStatistic}/>
}