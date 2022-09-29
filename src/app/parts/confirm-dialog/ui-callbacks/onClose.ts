import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ConfirmDialogCallbackSettings} from "../types/ConfirmDialogCallbackSettings";

export const onClose: ICallback<ConfirmDialogCallbackSettings, void> = (
    {setState, services: {confirmDialogService}}
) => {
    setState((prevState) => {
        return {
            ...prevState,
            isOpen: false, message: ''
        }
    });
    confirmDialogService.confirmationChannel.unsubscribe();
}