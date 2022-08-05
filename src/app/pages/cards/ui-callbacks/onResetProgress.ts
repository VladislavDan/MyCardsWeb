import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";

export const onResetProgress: ICallback<CardsCallbackSettings, number> = (
    {
        services,
        location
    },
    cardID = -1
) => {
    services.cardsListService.resetCardProgressChannel.next(
        {
            cardID,
            cardsGroupID: location.state.cardsGroupID
        }
    )
}