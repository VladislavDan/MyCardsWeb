import {ICallbackSettings} from "../../../../MyTools/react-types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {IToolbarContainer} from "./IToolbarContainer";

export type ToolbarCallbackSettings = ICallbackSettings<string,
    IToolbarContainer,
    INavigationState,
    IAppContext>