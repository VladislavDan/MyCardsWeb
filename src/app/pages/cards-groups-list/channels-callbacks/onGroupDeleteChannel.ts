import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onGroupDeleteChannel: ICallback<ICardsGroupsCallbackSettings, ICardsGroup[]> = (
    {
        services: {
            cardsGroupsListService
        }
    }
) => {
    cardsGroupsListService.groupsListChannel.next(empty);
}