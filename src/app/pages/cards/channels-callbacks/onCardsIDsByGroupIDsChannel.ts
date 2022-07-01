import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onCardsIDsByGroupIDsChannel: ICallback<CardsContainerCallbackSettings, number[]> = (
    {history, location},
    args
) => {
    history.push({
        pathname: Routs.cardsRepeater.path,
        state: {
            ...location.state,
            cardsIDsForRepeating: args || []
        }
    })
}