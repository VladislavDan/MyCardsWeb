import {Routs} from "../../../common/Routs";
import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";

export const onClickItem: ICallback<ICardsGroupsCallbackSettings, number> = (
    {history, location},
    cardsGroupID = -1
) => {
    history.push({
        pathname: Routs.cards.path,
        state: {
            ...location.state,
            cardsGroupID
        }
    })
}