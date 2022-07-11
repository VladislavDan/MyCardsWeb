import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

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

        confirmDialogService.openDialogChannel.next({
            isOpen: false,
            message: ''
        })
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to remove this card?'
    })
}