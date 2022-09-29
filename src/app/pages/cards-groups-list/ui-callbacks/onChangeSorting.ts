import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {ISortVariant} from "../../../common/types/ISortVariant";

export const onChangeSorting: ICallback<ICardsGroupsCallbackSettings, ISortVariant> = (
    {services: {cardsGroupsListService}, setState},
    sortVariant = ISortVariant.NONE
) => {
    setState((prevState) => {
        const newFilter = {
            ...prevState.filter,
            sort: sortVariant
        }
        cardsGroupsListService.changeFilterChannel.next(newFilter);
        return prevState;
    })
}