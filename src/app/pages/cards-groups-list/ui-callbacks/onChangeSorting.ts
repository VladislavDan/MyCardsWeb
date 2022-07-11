import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {ISortVariant} from "../../../common/types/ISortVariant";

export const onChangeSorting: ICallback<ICardsGroupsCallbackSettings, ISortVariant> = (
    {services: {cardsGroupsListService}, state},
    sortVariant = ISortVariant.NONE
) => {
    const newFilter = {
        ...state.filter,
        sort: sortVariant
    }
    cardsGroupsListService.changeFilterChannel.next(newFilter);
}