import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";
import {IRepeater} from "../../../common/types/IRepeater";
import {defaultRepeater} from "../../../common/defaults/defaultRepeater";

export const onUpdateGroupsIDsChannel: ICallback<RepeaterEditorCallbackSettings, IRepeater> = (
    {setState},
    repeater = defaultRepeater
) => {
    setState((prevState) => {
        return {
            ...prevState,
            repeater
        }
    })
}