import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {LocalBackupsCallbackSettings} from "../types/LocalBackupsCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";
import LoadIcon from "@mui/icons-material/Download";
import * as React from "react";

export const onFileSelect: ICallback<LocalBackupsCallbackSettings, any> = (
    {
        setSubscription,
        services: {
            spinnerService,
            confirmDialogService,
            localBackupsService
        }
    },
    event
) => {

    let file = null;
    if (event) {
        file = event.target.files[0];
    }
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (readerEvent: any) => {
        const games: string = readerEvent.target.result;

        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                spinnerService.spinnerCounterChannel.next(1);
                localBackupsService.loadBackupChannel.next(games);
            }

            confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to load this backup, your current changes could be removed?',
            titleBackgroundColor: 'red',
            icon: <LoadIcon/>
        });
    };
    reader.readAsText(file);
}