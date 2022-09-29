import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onClickItem: ICallback<CardsCallbackSettings, number> = (
    {
        location,
        history
    },
    cardID = -1
) => {
    history.push({
        pathname: Routs.cardViewer.path,
        state: {
            ...location.state,
            cardsGroupID: location.state.cardsGroupID,
            cardID
        }
    })
}