import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const onDelete: ICallback<GoogleBackupCallbackSettings, string> = (
    {
        setSubscription,
        services: {
            spinnerService,
            googleBackupsService,
            confirmDialogService
        }
    },
    backupID = '-1'
) => {
    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            spinnerService.spinnerCounterChannel.next(1);
            googleBackupsService.backupDeleteChannel.next(backupID);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to delete this backup?',
        titleBackgroundColor: 'red',
        icon: <DeleteIcon/>
    });
}