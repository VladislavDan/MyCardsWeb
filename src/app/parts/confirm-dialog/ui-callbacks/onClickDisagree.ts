import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ConfirmDialogCallbackSettings} from "../types/ConfirmDialogCallbackSettings";

export const onClickDisagree: ICallback<ConfirmDialogCallbackSettings, void> = (
    {services: {confirmDialogService}}
) => {
    confirmDialogService.confirmationChannel.next(false);
}