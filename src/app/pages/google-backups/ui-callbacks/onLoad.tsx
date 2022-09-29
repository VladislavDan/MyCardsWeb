import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";
import UploadIcon from "@mui/icons-material/Upload";
import * as React from "react";

export const onLoad: ICallback<GoogleBackupCallbackSettings, string> = (
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
            googleBackupsService.backupLoadChannel.next(backupID);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to load this backup?',
            titleBackgroundColor: 'red',
            icon: <UploadIcon/>
        }
    );
}