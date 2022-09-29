import {ICallbackSettings} from "../../../../MyTools/react-types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {IStatisticContainer} from "./IStatisticContainer";
import {StatisticContainerState} from "./StatisticContainerState";

export type StatisticCallbackSettings = ICallbackSettings<StatisticContainerState,
    IStatisticContainer,
    INavigationState,
    IAppContext>