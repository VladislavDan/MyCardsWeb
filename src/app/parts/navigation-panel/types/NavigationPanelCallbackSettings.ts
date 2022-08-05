import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {NavigationPanelState} from "./NavigationPanelState";
import {INavigationPanelContainer} from "./INavigationPanelContainer";

export type NavigationPanelCallbackSettings = ICallbackSettings<NavigationPanelState,
    INavigationPanelContainer,
    INavigationState,
    IAppContext>