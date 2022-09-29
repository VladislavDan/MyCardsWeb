import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ToolbarCallbackSettings} from "../types/ToolbarCallbackSettings";

export const onToolbarExternalLabelChannel: ICallback<ToolbarCallbackSettings, string> = (
    {setState},
    label = ''
) => {
    setState(() => label);
}