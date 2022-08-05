import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onEditItem: ICallback<CardsCallbackSettings, number> = (
    {
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