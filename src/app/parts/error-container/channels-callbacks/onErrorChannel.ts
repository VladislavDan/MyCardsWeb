import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ErrorCallbackSettings} from "../types/ErrorCallbackSettings";

export const onErrorChannel: ICallback<ErrorCallbackSettings, string> = (
    {setState},
    errorMessage = ''
) => {
    setState(() => {
        return {
            isOpen: true,
            errorMessage
        }
    })
}