import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onOpenRepeater: ICallback<CardsContainerCallbackSettings, void> = (
    {
        state,
        location,
        services
    }
) => {
    if (state.isEnabledSelecting) {
        services.cardsListService.cardsIDsBySelectedItemsChannel.next(state.selectedItems);
    } else {
        services.cardsListService.cardsIDsByGroupIDsChannel.next(location.state.cardsGroupID);
    }
}