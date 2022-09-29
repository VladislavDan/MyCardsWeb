import DeleteIcon from '@mui/icons-material/Delete';

import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onDeleteItem: ICallback<CardsCallbackSettings, number> = (
    {
        setSubscription,
        services
    },
    cardID = -1
) => {
    const {confirmDialogService, cardsListService} = services;
    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm: boolean) => {
        if (isConfirm) {
            cardsListService.deleteSingleCardChannel.next(cardID);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to remove this card?',
        titleBackgroundColor: 'red',
        icon: <DeleteIcon/>
    })
}