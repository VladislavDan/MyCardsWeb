import {Routs} from "../../../common/Routs";
import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";

export const onOpenEditor: ICallback<RepeaterListCallbackSettings, void> = (
    {history, location}
) => {
    history.push({
        pathname: Routs.repeaterEditor.path
    })
}