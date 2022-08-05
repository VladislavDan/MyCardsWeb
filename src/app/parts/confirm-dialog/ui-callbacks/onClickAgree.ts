import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ConfirmDialogCallbackSettings} from "../types/ConfirmDialogCallbackSettings";

export const onClickAgree: ICallback<ConfirmDialogCallbackSettings, void> = (
    {services: {confirmDialogService}}
) => {
    confirmDialogService.confirmationChannel.next(true);
}