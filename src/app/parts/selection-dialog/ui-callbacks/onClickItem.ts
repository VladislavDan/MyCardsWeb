import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SelectionDialogCallbackSettings} from "../types/SelectionDialogCallbackSettings";

export const onClickItem: ICallback<SelectionDialogCallbackSettings, number> = (
    {setState, services: {selectionDialogService}},
    itemID = -1
) => {
    selectionDialogService.selectionChannel.next(itemID);
}