import {LocalBackupsService} from "../LocalBackupsService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";
import {SpinnerService} from "../../../parts/spinner/SpinnerService";

export interface ILocalBackupsContainer {
    localBackupsService: LocalBackupsService;
    confirmDialogService: ConfirmDialogService;
    spinnerService: SpinnerService;
}