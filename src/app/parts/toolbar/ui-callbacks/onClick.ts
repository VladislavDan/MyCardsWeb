import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ToolbarCallbackSettings} from "../types/ToolbarCallbackSettings";

export const onClick: ICallback<ToolbarCallbackSettings, void> = (
    {services: {navigationPanelService}}
) => {
    navigationPanelService.navigationPanelOpenChannel.next('');
}