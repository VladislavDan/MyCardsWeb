import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onResetProgress: ICallback<CardsContainerCallbackSettings, number> = (
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