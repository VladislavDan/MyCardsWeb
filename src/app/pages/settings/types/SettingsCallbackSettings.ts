import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {ISettingsContainer} from "./ISettingsContainer";
import {ISettings} from "../../../common/types/ISettings";

export type SettingsCallbackSettings = ICallbackSettings<ISettings,
    ISettingsContainer,
    INavigationState,
    IAppContext>