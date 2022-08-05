import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ErrorCallbackSettings} from "../types/ErrorCallbackSettings";
import {initialState} from "../defaults/initialState";

export const onClose: ICallback<ErrorCallbackSettings, void> = (
    {setState}
) => {
    setState(() => {
        return initialState
    })
}