import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";
import {IRepeater} from "../../../common/types/IRepeater";
import {defaultRepeater} from "../../../common/defaults/defaultRepeater";

export const onRepeaterChannel: ICallback<RepeaterEditorCallbackSettings, IRepeater> = (
    {setState, services: {repeaterEditorService}},
    repeater = defaultRepeater
) => {
    repeaterEditorService.selectedGroupsChannel.next(repeater);
    setState((prevState) => {
        return {
            ...prevState,
            repeater
        }
    })
}