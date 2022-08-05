import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {SelectionDialogContainerState} from "./SelectionDialogContainerState";
import {ISelectionDialogContainer} from "./ISelectionDialogContainer";

export type SelectionDialogCallbackSettings = ICallbackSettings<SelectionDialogContainerState,
    ISelectionDialogContainer,
    INavigationState,
    IAppContext>