import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onChangeSearchableText: ICallback<CardsContainerCallbackSettings, string> = (
    {services, setState, state, location},
    searchableText = ''
) => {
    const newFilter = {
        ...state.filter,
        searchableText: searchableText
    }

    services.cardsListService.changeFilterChannel.next(newFilter)
}