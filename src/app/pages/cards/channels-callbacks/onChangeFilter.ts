import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {IStoredFilters} from "../../../common/types/IStoredFilters";
import {defaultFilterValue} from "../../../common/Constants";

export const onChangeFilter: ICallback<CardsContainerCallbackSettings, IStoredFilters> = (
    {services, location},
    storedFilters = {
        cards: defaultFilterValue,
        cardsGroups: defaultFilterValue
    }
) => {
    services.cardsListService.filterChannel.next('');
}