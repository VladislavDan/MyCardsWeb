import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onGroupsListChannel: ICallback<ICardsGroupsCallbackSettings, ICardsGroup[]> = (
    {setState, state},
    cardsGroups = []
) => {
    setState((prevState) => {
        return {...prevState, cardsGroups}
    })
}