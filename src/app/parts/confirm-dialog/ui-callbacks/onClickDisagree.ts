import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ConfirmDialogCallbackSettings} from "../types/ConfirmDialogCallbackSettings";

export const onClickDisagree: ICallback<ConfirmDialogCallbackSettings, void> = (
    {services: {confirmDialogService}}
) => {
    confirmDialogService.confirmationChannel.next(false);
}