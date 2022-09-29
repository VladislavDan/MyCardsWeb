import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onEditItem: ICallback<ICardsGroupsCallbackSettings, number> = (
    {history, location},
    cardsGroupID = -1
) => {
    history.push({
        pathname: Routs.cardsGroupEditor.path,
        state: {
            ...location.state,
            cardsGroupID: cardsGroupID
        }
    })
}