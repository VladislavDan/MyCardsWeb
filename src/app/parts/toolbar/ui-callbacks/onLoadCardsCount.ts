import {ICallback} from '../../../../MyTools/react-types/ICallback';
import {ToolbarCallbackSettings} from '../types/ToolbarCallbackSettings';

export const onLoadCardsCount: ICallback<ToolbarCallbackSettings, string> = (
    {
        location,
        services: {toolbarService}
    }
) => {
    toolbarService.cardsCountInGroupChannel.next({
        path: location.pathname,
        cardsGroupsId: location.state ? location.state.cardsGroupID : -1
    });
}