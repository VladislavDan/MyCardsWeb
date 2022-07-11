import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";

export const onChangeSearchableText: ICallback<ICardsGroupsCallbackSettings, string> = (
    {
        state,
        services: {
            cardsGroupsListService
        }
    },
    searchableText = ''
) => {
    cardsGroupsListService.changeFilterChannel.next({
        ...state.filter,
        searchableText
    })
}