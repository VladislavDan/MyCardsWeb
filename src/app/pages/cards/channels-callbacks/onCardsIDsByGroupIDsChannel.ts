import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onCardsIDsByGroupIDsChannel: ICallback<CardsCallbackSettings, number[]> = (
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