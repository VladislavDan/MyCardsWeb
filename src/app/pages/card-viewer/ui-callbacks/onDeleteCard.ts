import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onDeleteCard: ICallback<CardViewerCallbackSettings, void> = (
    settings
) => {
    const {services, state, setSubscription} = settings;

    const {confirmDialogService, cardViewerService} = services;

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            cardViewerService.deleteSingleCardChannel.next(state.card.id);
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