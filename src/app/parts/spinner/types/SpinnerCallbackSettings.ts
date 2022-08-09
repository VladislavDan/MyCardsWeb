import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {ISpinnerContainer} from "./ISpinnerContainer";

export type SpinnerCallbackSettings = ICallbackSettings<boolean,
    ISpinnerContainer,
    INavigationState,
    IAppContext>