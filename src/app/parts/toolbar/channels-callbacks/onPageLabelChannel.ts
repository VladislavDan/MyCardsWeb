import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ToolbarCallbackSettings} from "../types/ToolbarCallbackSettings";

export const onPageLabelChannel: ICallback<ToolbarCallbackSettings, string> = (
    {setState},
    label = ''
) => {
    setState(() => label);
}