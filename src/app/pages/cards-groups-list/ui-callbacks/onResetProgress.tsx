import RefreshIcon from '@mui/icons-material/Refresh';

import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/Constants";

export const onResetProgress: ICallback<ICardsGroupsCallbackSettings, number> = (
    {services, setSubscription},
    cardsGroupID = -1
) => {
    const {confirmDialogService, cardsGroupsListService} = services;
    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            cardsGroupsListService.resetProgressChannel.next(cardsGroupID);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to reset progress of this group?',
        titleBackgroundColor: 'green',
        icon: <RefreshIcon/>
    });
}