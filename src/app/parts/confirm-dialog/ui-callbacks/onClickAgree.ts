import {ConfirmDialogCallbackSettings} from "../types/ConfirmDialogCallbackSettings";
import {ICallback} from "../../../../MyTools/react-types/ICallback";

export const onClickAgree: ICallback<ConfirmDialogCallbackSettings, void> = (
    {services: {confirmDialogService}}
) => {
    confirmDialogService.confirmationChannel.next(true);
}