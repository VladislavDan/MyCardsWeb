import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onOpenRepeater: ICallback<CardsContainerCallbackSettings, void> = (
    {location, services}
) => {
    services.cardsListService.cardsIDsByGroupIDsChannel.next(location.state.cardsGroupID);
}