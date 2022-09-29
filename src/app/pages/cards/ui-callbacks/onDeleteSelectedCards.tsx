import DeleteIcon from '@mui/icons-material/Delete';

import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onDeleteSelectedCards: ICallback<CardsCallbackSettings, void> = (
    {services: {confirmDialogService, cardsListService}, setState, setSubscription}
) => {

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            setState((prevState) => {
                cardsListService.deleteCardsChannel.next(prevState.selectedItems);
                return prevState;
            })
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