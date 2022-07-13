import DeleteIcon from '@mui/icons-material/Delete';

import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/Constants";

export const onDeleteItem: ICallback<CardsContainerCallbackSettings, number> = (
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