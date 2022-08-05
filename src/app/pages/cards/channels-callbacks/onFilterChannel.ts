import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {IFilter} from "../../../common/types/IFilter";
import {defaultFilterValue} from "../../../common/defaults/defaultFilterValue";

export const onFilterChannel: ICallback<CardsCallbackSettings, IFilter> = (
    {setState, services, location},
    filter = defaultFilterValue
) => {
    setState((prevState) => {
        return {
            ...prevState,
            filter
        }
    });
    services.cardsListService.cardsChannel.next({
        cardsGroupID: location.state.cardsGroupID,
        filter: filter
    })
}