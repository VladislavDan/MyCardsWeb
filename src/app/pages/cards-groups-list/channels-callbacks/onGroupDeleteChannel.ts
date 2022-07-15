import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onGroupDeleteChannel: ICallback<ICardsGroupsCallbackSettings, ICardsGroup[]> = (
    {
        services: {
            cardsGroupsListService
        }
    }
) => {
    cardsGroupsListService.groupsListChannel.next('');
}