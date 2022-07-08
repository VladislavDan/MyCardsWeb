import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onDeleteSingleCardChannel: ICallback<CardsContainerCallbackSettings, ICardsGroup[]> = (
    {state, services, location},
    cards = []
) => {
    services.cardsListService.cardsChannel.next({
        cardsGroupID: location.state.cardsGroupID,
        filter: state.filter
    })
}