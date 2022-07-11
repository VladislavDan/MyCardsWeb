import {ISortVariant} from "../../../common/types/ISortVariant";
import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onChangeSorting: ICallback<CardsContainerCallbackSettings, ISortVariant> = (
    {state, setState, services, location},
    sortVariant: ISortVariant = ISortVariant.NONE
) => {
    const newFilter = {
        ...state.filter,
        sort: sortVariant
    }
    services.cardsListService.changeFilterChannel.next(newFilter);
}