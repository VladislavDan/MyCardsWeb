import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onEditItem: ICallback<CardsContainerCallbackSettings, number> = (
    {
        state,
        location,
        history
    },
    cardID = -1
) => {
    history.push({
        pathname: Routs.cardsEditor.path,
        state: {
            ...location.state,
            cardsGroupID: location.state.cardsGroupID,
            cardID: cardID
        }
    })
}