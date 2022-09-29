import {ICallback} from "../../../../MyTools/react-types/ICallback";
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