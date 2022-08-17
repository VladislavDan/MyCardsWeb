import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {IFilter} from "../../../common/types/IFilter";
import {defaultFilter} from "../../../common/defaults/defaultFilter";

export const onFilterChannel: ICallback<CardsCallbackSettings, IFilter> = (
    {setState, services, location},
    filter = defaultFilter
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