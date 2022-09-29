import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";

export const onSelectedGroupsChannel: ICallback<RepeaterEditorCallbackSettings, {
    [key: number]: boolean;
}> = (
    {setState},
    selectedGroups = {}
) => {
    setState((prevState) => {
        return {
            ...prevState,
            selectedGroups
        }
    })
}