import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onCardGroupNameChannel: ICallback<CardViewerCallbackSettings, string> = (
    {services},
    label
) => {
    services.toolbarService.toolbarExternalLabelChannel.next(label as string);
}