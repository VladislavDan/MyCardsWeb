import {ICallbackSettings} from "../../../../MyTools/react-types/ICallbackSettings";
import {CardRepeaterContainerState} from "./CardRepeaterContainerState";
import {ICardRepeaterContainer} from "./ICardRepeaterContainer";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";

export type CardRepeaterCallbackSettings = ICallbackSettings<CardRepeaterContainerState,
    ICardRepeaterContainer,
    INavigationState,
    IAppContext>