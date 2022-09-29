import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SelectionDialogCallbackSettings} from "../types/SelectionDialogCallbackSettings";
import {SelectionDialogContainerState} from "../types/SelectionDialogContainerState";
import {initialState} from "../defaults/initialState";

export const onOpenDialogChannel: ICallback<SelectionDialogCallbackSettings, SelectionDialogContainerState> = (
    {setState},
    value = initialState
) => {
    setState(() => {
        return {...value}
    });
}