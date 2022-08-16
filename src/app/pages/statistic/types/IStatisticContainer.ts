import {StatisticService} from "../StatisticService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";

export interface IStatisticContainer {
    statisticService: StatisticService;
    confirmDialogService: ConfirmDialogService;
}