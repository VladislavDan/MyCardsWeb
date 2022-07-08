import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onClickItem: ICallback<CardsContainerCallbackSettings, number> = (
    {
        state,
        location,
        history
    },
    cardID
) => {
    history.push({
        pathname: Routs.cardViewer.path,
        state: {
            ...location.state,
            cardsGroupID: location.state.cardsGroupID,
            cardID: cardID
        }
    })
}