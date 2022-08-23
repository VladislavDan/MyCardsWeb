import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";
import DeleteIcon from "@mui/icons-material/Delete";

export const onRemoveRepeater: ICallback<RepeaterListCallbackSettings, number> = (
    {
        setSubscription,
        services: {
            repeaterListService,
            confirmDialogService
        }
    },
    repeaterID = -1
) => {

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm: boolean) => {
        if (isConfirm) {
            repeaterListService.removingRepeaterChannel.next(repeaterID);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to remove this repeater?',
        titleBackgroundColor: 'red',
        icon: <DeleteIcon/>
    })
}