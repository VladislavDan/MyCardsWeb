import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {SelectionDialogCallbackSettings} from "../types/SelectionDialogCallbackSettings";

export const onClickItem: ICallback<SelectionDialogCallbackSettings, number> = (
    {setState, services: {selectionDialogService}},
    itemID = -1
) => {
    selectionDialogService.selectionChannel.next(itemID);
}