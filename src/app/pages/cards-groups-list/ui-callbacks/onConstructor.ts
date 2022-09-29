import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onConstructor: ICallback<ICardsGroupsCallbackSettings, void> = (
    {services}
) => {
    services.cardsGroupsListService.groupsListChannel.next(empty);
    services.cardsGroupsListService.filterChannel.next(empty);
}