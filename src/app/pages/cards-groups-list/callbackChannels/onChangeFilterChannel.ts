import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {IStoredFilters} from "../../../common/types/IStoredFilters";

export const onChangeFilterChannel: ICallback<ICardsGroupsCallbackSettings, IStoredFilters> = (
    {
        services: {
            cardsGroupsListService
        }
    }
) => {
    cardsGroupsListService.filterChannel.next('');
    cardsGroupsListService.groupsListChannel.next('');
}