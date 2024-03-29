import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";

export const onChangeSearchableText: ICallback<CardsCallbackSettings, string> = (
    {services, setState, location},
    searchableText = ''
) => {
    setState((prevState) => {
        const newFilter = {
            ...prevState.filter,
            searchableText: searchableText
        }

        services.cardsListService.changeFilterChannel.next(newFilter)

        return prevState;
    })
}