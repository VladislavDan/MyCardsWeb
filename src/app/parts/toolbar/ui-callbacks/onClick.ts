import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ToolbarCallbackSettings} from "../types/ToolbarCallbackSettings";
import {MouseEvent} from "react";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onClick: ICallback<ToolbarCallbackSettings, MouseEvent> = (
    {services: {navigationPanelService}}
) => {
    navigationPanelService.navigationPanelOpenChannel.next(empty);
}