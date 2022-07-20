import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {IGoogleAuthContainer} from "./IGoogleAuthContainer";

export type GoogleAuthCallbackSettings = ICallbackSettings<null,
    IGoogleAuthContainer,
    INavigationState,
    IAppContext>