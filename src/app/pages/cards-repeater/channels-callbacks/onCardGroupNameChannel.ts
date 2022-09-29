import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onCardGroupNameChannel: ICallback<CardRepeaterCallbackSettings, string> = (
    {services},
    label
) => {
    services.toolbarService.toolbarExternalLabelChannel.next(label as string);
}