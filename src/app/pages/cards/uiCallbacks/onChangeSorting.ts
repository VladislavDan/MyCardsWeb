import {ISortVariants} from "../../../common/types/ISortVariants";
import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onChangeSorting: ICallback<CardsContainerCallbackSettings, ISortVariants> = (
    {state, setState, services, location},
    sortVariant: ISortVariants = ISortVariants.NONE
) => {
    const newFilter = {
        ...state.filter,
        sort: sortVariant
    }

    setState((prevState) => {
        return {
        ...prevState,
            filter: newFilter
        }
    })

    services.cardsListService.cardsChannel.next({
        cardsGroupID: location.state.cardsGroupID,
        filter: newFilter
    })
}