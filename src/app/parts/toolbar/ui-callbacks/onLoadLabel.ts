import {ToolbarCallbackSettings} from '../types/ToolbarCallbackSettings';
import {ICallback} from '../../../../MyTools/react-types/ICallback';

export const onLoadLabel: ICallback<ToolbarCallbackSettings, string> = (
    {
        location,
        services: {toolbarService}
    }
) => {
    toolbarService.pageLabelChannel.next({
        path: location.pathname,
        cardsGroupsId: location.state ? location.state.cardsGroupID : -1
    });
}