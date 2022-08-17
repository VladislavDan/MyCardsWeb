import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {IStoredFilters} from "../../../common/types/IStoredFilters";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onChangeFilterChannel: ICallback<ICardsGroupsCallbackSettings, IStoredFilters> = (
    {
        services: {
            cardsGroupsListService
        }
    }
) => {
    cardsGroupsListService.filterChannel.next(empty);
    cardsGroupsListService.groupsListChannel.next(empty);
}