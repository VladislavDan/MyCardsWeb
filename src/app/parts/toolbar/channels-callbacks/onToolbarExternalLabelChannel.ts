import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ToolbarCallbackSettings} from "../types/ToolbarCallbackSettings";

export const onToolbarExternalLabelChannel: ICallback<ToolbarCallbackSettings, string> = (
    {setState},
    label = ''
) => {
    setState(() => label);
}