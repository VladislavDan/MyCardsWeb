import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {ErrorContainerState} from "./ErrorContainerState";
import {IErrorContainer} from "./IErrorContainer";

export type ErrorCallbackSettings = ICallbackSettings<ErrorContainerState,
    IErrorContainer,
    INavigationState,
    IAppContext>