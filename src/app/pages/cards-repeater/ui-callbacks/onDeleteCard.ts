import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onDeleteCard: ICallback<CardRepeaterCallbackSettings, void> = (
    settings
) => {
    const {services, state, setSubscription} = settings;

    const {confirmDialogService, cardsRepeaterService} = services;

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm: boolean) => {
        if (isConfirm) {
            cardsRepeaterService.deleteSingleCardChannel.next(state.card.id);
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