import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";

export const onChangeName: ICallback<RepeaterEditorCallbackSettings, string> = (
    {setState},
    name = ''
) => {
    setState((prevState) => {
        return {
            ...prevState,
            repeater: {
                ...prevState.repeater,
                name
            }
        }
    })
}