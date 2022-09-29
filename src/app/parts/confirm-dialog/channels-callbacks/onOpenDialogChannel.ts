import {ConfirmDialogCallbackSettings} from "../types/ConfirmDialogCallbackSettings";
import {ConfirmDialogContainerState} from "../types/ConfirmDialogContainerState";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";
import {ICallback} from "../../../../MyTools/react-types/ICallback";

export const onOpenDialogChannel: ICallback<ConfirmDialogCallbackSettings, ConfirmDialogContainerState> = (
    {setState, services: {confirmDialogService}},
    confirmDialogContainerState = defaultConfirmDialogState
) => {
    setState(() => {
        return {...confirmDialogContainerState}
    })
}