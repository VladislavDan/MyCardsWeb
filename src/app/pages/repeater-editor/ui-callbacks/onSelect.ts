import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";

export const onSelect: ICallback<RepeaterEditorCallbackSettings, number> = (
    {setState, services: {repeaterEditorService}},
    cardID = -1
) => {
    setState((prevState) => {
        prevState.selectedGroups[cardID] = !prevState.selectedGroups[cardID];
        repeaterEditorService.updateGroupsIDsChannel.next({
            selectedGroups: prevState.selectedGroups,
            repeater: prevState.repeater
        })

        return {
            ...prevState
        }
    })
}