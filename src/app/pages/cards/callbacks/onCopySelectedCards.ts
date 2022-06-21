import {CardsContainerState} from "../types/CardsContainerState";
import {SelectionDialogService} from "../../../parts/selection-dialog/SelectionDialogService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";
import {CardsService} from "../CardsService";
import {Subscription} from "rxjs";

export const onCopySelectedCards = (
    selectionDialogService: SelectionDialogService,
    confirmDialogService: ConfirmDialogService,
    cardsListService: CardsService,
    state: CardsContainerState,
    setSubscription: (subscribtion: Subscription) => void
) => {
    const onCopySelectedCards = () => {
        const subscription = selectionDialogService.selectionChannel.subscribe((groupID) => {

            const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
                if (isConfirm) {
                    cardsListService.copyCardsChannel.next({
                        selectedItems: state.selectedItems,
                        destinationGroupID: groupID
                    });

                    selectionDialogService.openDialogChannel.next({
                        isOpen: false,
                        title: '',
                        selectionItems: []
                    });
                }

                confirmDialogService.openDialogChannel.next({
                    isOpen: false,
                    message: ''
                })
            });

            setSubscription(subscription);

            confirmDialogService.openDialogChannel.next({
                isOpen: true,
                message: 'Do you want to copy this cards?'
            });
        });

        setSubscription(subscription);

        selectionDialogService.openDialogChannel.next({
            isOpen: true,
            title: 'Select cards group',
            selectionItems: state.existedGroupsIDs
        })
    }
    return onCopySelectedCards;
}