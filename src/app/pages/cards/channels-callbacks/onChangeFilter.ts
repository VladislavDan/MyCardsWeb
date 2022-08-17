import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {IStoredFilters} from "../../../common/types/IStoredFilters";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onChangeFilter: ICallback<CardsCallbackSettings, IStoredFilters> = (
    {services, location}
) => {
    services.cardsListService.filterChannel.next(empty);
}