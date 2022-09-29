import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onCardGroupNameChannel: ICallback<CardViewerCallbackSettings, string> = (
    {services},
    label
) => {
    services.toolbarService.toolbarExternalLabelChannel.next(label as string);
}