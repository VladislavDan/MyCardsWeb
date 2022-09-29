import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SelectionDialogCallbackSettings} from "../types/SelectionDialogCallbackSettings";
import {initialState} from "../defaults/initialState";

export const onClose: ICallback<SelectionDialogCallbackSettings, void> = (
    {setState, services: {selectionDialogService}}
) => {
    setState(() => initialState);
    selectionDialogService.selectionChannel.unsubscribe();
}