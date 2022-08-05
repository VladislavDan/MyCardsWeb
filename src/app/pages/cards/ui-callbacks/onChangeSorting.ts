import {ISortVariant} from "../../../common/types/ISortVariant";
import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";

export const onChangeSorting: ICallback<CardsCallbackSettings, ISortVariant> = (
    {setState, services, location},
    sortVariant: ISortVariant = ISortVariant.NONE
) => {
    setState((prevState) => {
        const newFilter = {
            ...prevState.filter,
            sort: sortVariant
        }
        services.cardsListService.changeFilterChannel.next(newFilter);
        return prevState;
    })
}