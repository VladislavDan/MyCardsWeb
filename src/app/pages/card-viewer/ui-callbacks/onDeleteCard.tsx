import DeleteIcon from '@mui/icons-material/Delete';

import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onDeleteCard: ICallback<CardViewerCallbackSettings, void> = (
    {services, setSubscription, setState}
) => {
    setState((prevState) => {
        const {confirmDialogService, cardViewerService} = services;

        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                cardViewerService.deleteSingleCardChannel.next(prevState.card.id);
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
        return prevState;
    });
}