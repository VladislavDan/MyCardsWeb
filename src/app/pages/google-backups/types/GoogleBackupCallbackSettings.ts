import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {IGoogleBackupsContainer} from "./IGoogleBackupsContainer";
import {GoogleBackupsContainerState} from "./GoogleBackupsContainerState";

export type GoogleBackupCallbackSettings = ICallbackSettings<GoogleBackupsContainerState,
    IGoogleBackupsContainer,
    INavigationState,
    IAppContext>