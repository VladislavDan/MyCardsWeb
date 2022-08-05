import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {ConfirmDialogContainerState} from "./ConfirmDialogContainerState";
import {IConfirmDialogContainer} from "./IConfirmDialogContainer";

export type ConfirmDialogCallbackSettings = ICallbackSettings<ConfirmDialogContainerState,
    IConfirmDialogContainer,
    INavigationState,
    IAppContext>