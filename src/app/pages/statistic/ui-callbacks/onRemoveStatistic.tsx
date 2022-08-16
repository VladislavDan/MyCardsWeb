import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {StatisticCallbackSettings} from "../types/StatisticCallbackSettings";
import {defaultConfirmDialogState} from "../../../common/defaults/defaultConfirmDialogState";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";

export const onRemoveStatistic: ICallback<StatisticCallbackSettings, void> = (
    {setSubscription, services: {statisticService, confirmDialogService}}
) => {

    const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
        if (isConfirm) {
            statisticService.removeStatisticChannel.next('');
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