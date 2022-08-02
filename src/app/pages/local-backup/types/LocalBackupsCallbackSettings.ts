import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {ILocalBackupsContainer} from "./ILocalBackupsContainer";

export type LocalBackupsCallbackSettings = ICallbackSettings<null,
    ILocalBackupsContainer,
    INavigationState,
    IAppContext>