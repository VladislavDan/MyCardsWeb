import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterEditorCallbackSettings} from "../types/RepeaterEditorCallbackSettings";
import {IRepeater} from "../../../common/types/IRepeater";

export const onSaveRepeaterChannel: ICallback<RepeaterEditorCallbackSettings, IRepeater[]> = (
    {history}
) => {
    history.goBack();
}