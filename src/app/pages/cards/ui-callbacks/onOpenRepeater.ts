import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";

export const onOpenRepeater: ICallback<CardsCallbackSettings, void> = (
    {
        setState,
        location,
        services
    }
) => {
    setState((prevState) => {
        if (prevState.isEnabledSelecting) {
            services.cardsListService.cardsIDsBySelectedItemsChannel.next(prevState.selectedItems);
        } else {
            services.cardsListService.cardsIDsByGroupIDsChannel.next(location.state.cardsGroupID);
        }
        return prevState;
    })
}