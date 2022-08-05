import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {IStoredFilters} from "../../../common/types/IStoredFilters";
import {defaultFilterValue} from "../../../common/defaults/defaultFilterValue";

export const onChangeFilter: ICallback<CardsCallbackSettings, IStoredFilters> = (
    {services, location},
    storedFilters = {
        cards: defaultFilterValue,
        cardsGroups: defaultFilterValue
    }
) => {
    services.cardsListService.filterChannel.next('');
}