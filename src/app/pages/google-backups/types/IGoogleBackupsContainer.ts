import {SpinnerService} from "../../../parts/spinner/SpinnerService";
import {GoogleBackupsService} from "../GoogleBackupsService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";

export interface IGoogleBackupsContainer {
    spinnerService: SpinnerService;
    googleBackupsService: GoogleBackupsService;
    confirmDialogService: ConfirmDialogService;
}