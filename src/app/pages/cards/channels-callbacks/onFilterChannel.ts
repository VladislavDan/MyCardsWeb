import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {IFilter} from "../../../common/types/IFilter";
import {defaultFilterValue} from "../../../common/Constants";

export const onFilterChannel: ICallback<CardsContainerCallbackSettings, IFilter> = (
    {state, setState, services, location},
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