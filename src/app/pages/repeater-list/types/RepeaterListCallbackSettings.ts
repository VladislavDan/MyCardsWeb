import {ICallbackSettings} from "../../../../MyTools/react-types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {RepeaterListState} from "./RepeaterListState";
import {IRepeaterListContainer} from "./IRepeaterListContainer";

export type RepeaterListCallbackSettings = ICallbackSettings<RepeaterListState,
    IRepeaterListContainer,
    INavigationState,
    IAppContext>