import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ToolbarCallbackSettings} from "../types/ToolbarCallbackSettings";
import {MouseEvent} from "react";

export const onClick: ICallback<ToolbarCallbackSettings, MouseEvent> = (
    {services: {navigationPanelService}}
) => {
    navigationPanelService.navigationPanelOpenChannel.next('');
}