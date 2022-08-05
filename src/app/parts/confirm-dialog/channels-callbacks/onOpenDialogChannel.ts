import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ConfirmDialogCallbackSettings} from "../types/ConfirmDialogCallbackSettings";
import {ConfirmDialogContainerState} from "../types/ConfirmDialogContainerState";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onOpenDialogChannel: ICallback<ConfirmDialogCallbackSettings, ConfirmDialogContainerState> = (
    {setState, services: {confirmDialogService}},
    confirmDialogContainerState = defaultConfirmDialogState
) => {
    setState(() => {
        return {...confirmDialogContainerState}
    })
}