import CopyIcon from '@mui/icons-material/CopyAll';

import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onCopySelectedCards: ICallback<CardsCallbackSettings, void> = (
    {services, setState, setSubscription}
) => {
    const {
        cardsListService,
        confirmDialogService,
        selectionDialogService
    } = services;

    setState((prevState) => {

        const subscription = selectionDialogService.selectionChannel.subscribe((groupID) => {

            const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
                if (isConfirm) {
                    cardsListService.copyCardsChannel.next({
                        selectedItems: prevState.selectedItems,
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
                message: 'Do you want to copy this cards?',
                titleBackgroundColor: 'orange',
                icon: <CopyIcon/>
            });
        });

        setSubscription(subscription);

        selectionDialogService.openDialogChannel.next({
            isOpen: true,
            title: 'Select cards group',
            selectionItems: prevState.existedGroupsIDs
        })

        return prevState;
    })
}