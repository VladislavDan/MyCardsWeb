import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onCardsIDsBySelectedItemsChannel: ICallback<CardsContainerCallbackSettings, number[]> = (
    {history, location},
    args
) => {
    if (args && args.length > 1) {
        history.push({
            pathname: Routs.cardsRepeater.path,
            state: {
                ...location.state,
                cardsIDsForRepeating: args || []
            }
        })
    } else if (args && args.length === 1) {
        history.push({
            pathname: Routs.cardViewer.path,
            state: {
                ...location.state,
                cardsGroupID: location.state.cardsGroupID,
                cardID: args[0]
            }
        })
    }
}