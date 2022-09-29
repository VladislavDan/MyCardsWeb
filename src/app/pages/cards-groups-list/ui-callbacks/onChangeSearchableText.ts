import {ICallback} from "../../../../MyTools/react-types/ICallback";
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