import DeleteIcon from '@mui/icons-material/Delete';

import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onDeleteCard: ICallback<CardRepeaterCallbackSettings, void> = (
    settings
) => {
    const {services, state, setSubscription} = settings;

    const {confirmDialogService, cardsRepeaterService} = services;

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm: boolean) => {
        if (isConfirm) {
            cardsRepeaterService.deleteSingleCardChannel.next(state.card.id);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to delete this cards?',
        titleBackgroundColor: 'red',
        icon: <DeleteIcon/>
    });
}