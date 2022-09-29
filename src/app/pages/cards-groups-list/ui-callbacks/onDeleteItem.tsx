import DeleteIcon from '@mui/icons-material/Delete';

import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";

export const onDeleteItem: ICallback<ICardsGroupsCallbackSettings, number> = (
    {
        history,
        location,
        services: {
            confirmDialogService,
            cardsGroupsListService
        },
        setSubscription
    },
    cardsGroupID = -1
) => {
    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            cardsGroupsListService.groupDeleteChannel.next(cardsGroupID);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to remove this group?',
        icon: <DeleteIcon/>,
        titleBackgroundColor: 'red'
    })
}