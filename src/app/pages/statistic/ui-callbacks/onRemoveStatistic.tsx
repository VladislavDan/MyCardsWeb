import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {StatisticCallbackSettings} from "../types/StatisticCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onRemoveStatistic: ICallback<StatisticCallbackSettings, void> = (
    {setSubscription, services: {statisticService, confirmDialogService}}
) => {

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            statisticService.removeStatisticChannel.next(empty);
        }

        confirmDialogService.openDialogChannel.next(defaultConfirmDialogState)
    });

    setSubscription(subscription);

    confirmDialogService.openDialogChannel.next({
        isOpen: true,
        message: 'Do you want to delete statistic?',
        titleBackgroundColor: 'red',
        icon: <DeleteIcon/>
    });
}