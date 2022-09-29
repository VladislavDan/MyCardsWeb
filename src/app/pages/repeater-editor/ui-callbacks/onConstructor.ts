import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onConstructor: ICallback<RepeaterEditorCallbackSettings, void> = (
    {services: {repeaterEditorService}, location}
) => {
    const repeaterID = location.state && location.state.repeaterID;
    if (repeaterID) {
        repeaterEditorService.repeaterChannel.next(repeaterID);
    }
    repeaterEditorService.groupsListChannel.next(empty);
}