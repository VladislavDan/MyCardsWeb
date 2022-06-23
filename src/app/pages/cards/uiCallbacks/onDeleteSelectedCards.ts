import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onDeleteSelectedCards: ICallback<CardsContainerCallbackSettings, void> = (
    settings: CardsContainerCallbackSettings
) => {

    const {services, state, setSubscription} = settings;

    const {confirmDialogService, cardsListService} = services;

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            cardsListService.deleteCardsChannel.next(state.selectedItems);
        }

        confirmDialogService.openDialogChannel.next({
            isOpen: false,
            message: ''
        })
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to delete this cards?'
    });
}