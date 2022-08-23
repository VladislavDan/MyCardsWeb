import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onEditRepeater: ICallback<RepeaterListCallbackSettings, number> = (
    {history, location},
    repeaterID = -1
) => {
    history.push({
        pathname: Routs.repeaterEditor.path,
        state: {
            ...location.state,
            repeaterID
        }
    })
}