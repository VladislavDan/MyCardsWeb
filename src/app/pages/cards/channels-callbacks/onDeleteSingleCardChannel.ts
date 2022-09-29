import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onDeleteSingleCardChannel: ICallback<CardsCallbackSettings, ICardsGroup[]> = (
    {setState, services, location},
    cards = []
) => {
    setState((prevState) => {
        services.cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: prevState.filter
        })
        return prevState;
    })
}