import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onCopyCardsChannel: ICallback<CardsCallbackSettings, ICardsGroup[]> = (
    {services, setState, location}
) => {
    setState((prevState) => {
        services.cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: prevState.filter
        })
        return prevState;
    })
}