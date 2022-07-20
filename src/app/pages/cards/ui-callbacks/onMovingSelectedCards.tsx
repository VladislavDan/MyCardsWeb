import MoveIcon from '@mui/icons-material/MoveToInbox';

import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onMovingSelectedCards: ICallback<CardsContainerCallbackSettings, void> = (
    settings
) => {

    const {services, state, setSubscription} = settings;

    const {
        cardsListService,
        confirmDialogService,
        selectionDialogService
    } = services;

    const subscription = selectionDialogService.selectionChannel.subscribe((groupID) => {

        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                cardsListService.movingCardsChannel.next({
                    selectedItems: state.selectedItems,
                    destinationGroupID: groupID
                });

                selectionDialogService.openDialogChannel.next({
                    isOpen: false,
                    title: '',
                    selectionItems: []
                });
            }

            confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to move this cards?',
            titleBackgroundColor: 'green',
            icon: <MoveIcon/>
        });
    });

    setSubscription(subscription);

    selectionDialogService.openDialogChannel.next({
        isOpen: true,
        title: 'Select cards group',
        selectionItems: state.existedGroupsIDs
    })
}