import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";

export const onChangeSearchableText: ICallback<ICardsGroupsCallbackSettings, string> = (
    {
        setState,
        services: {
            cardsGroupsListService
        }
    },
    searchableText = ''
) => {
    setState((prevState) => {
        cardsGroupsListService.changeFilterChannel.next({
            ...prevState.filter,
            searchableText
        })
        return prevState
    })
}