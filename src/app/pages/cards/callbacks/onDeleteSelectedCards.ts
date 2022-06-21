import {CardsContainerState} from "../types/CardsContainerState";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";
import {CardsService} from "../CardsService";
import {Subscription} from "rxjs";

export const onDeleteSelectedCards = (
    confirmDialogService: ConfirmDialogService,
    cardsListService: CardsService,
    state: CardsContainerState,
    setSubscription: (subscribtion: Subscription) => void
) => {
    const onDeleteSelectedCards = () => {
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
    return onDeleteSelectedCards;
}