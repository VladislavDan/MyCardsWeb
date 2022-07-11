import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";

export const onResetProgress: ICallback<ICardsGroupsCallbackSettings, number> = (
    {services, setSubscription},
    cardsGroupID = -1
) => {
    const {confirmDialogService, cardsGroupsListService} = services;
    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            cardsGroupsListService.resetProgressChannel.next(cardsGroupID);
        }

        confirmDialogService.openDialogChannel.next({
            isOpen: false,
            message: ''
        })
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to reset progress of this group?'
    });
}