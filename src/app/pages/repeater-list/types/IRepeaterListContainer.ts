import {RepeaterListService} from "../RepeaterListService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";

export interface IRepeaterListContainer {
    repeaterListService: RepeaterListService;
    confirmDialogService: ConfirmDialogService;
}