import {CardsGroupsListService} from "../../../pages/cards-groups-list/CardsGroupsListService";
import {CardsGroupsEditorService} from "../../../pages/cards-groups-editor/CardsGroupsEditorService";
import {ErrorService} from "../../error-container/ErrorService";
import {GoogleAuthService} from "../../../pages/google-auth/GoogleAuthService";
import {GoogleBackupsService} from "../../../pages/google-backups/GoogleBackupsService";
import {SpinnerService} from "../../spinner/SpinnerService";
import {ConfirmDialogService} from "../../confirm-dialog/ConfirmDialogService";
import {CardsEditorService} from "../../../pages/cards-editor/CardsEditorService";
import {CardsService} from "../../../pages/cards/CardsService";
import {CardsRepeaterService} from "../../../pages/cards-repeater/CardsRepeaterService";
import {LocalBackupsService} from "../../../pages/local-backup/LocalBackupsService";
import {SettingsService} from "../../../pages/settings/SettingsService";
import {CardViewerService} from "../../../pages/card-viewer/CardViewerService";
import {SelectionDialogService} from "../../selection-dialog/SelectionDialogService";
import {ToolbarService} from "../../toolbar/ToolbarService";
import {StatisticService} from "../../../pages/statistic/StatisticService";

export interface INavigationContainer {
    cardsGroupsListService: CardsGroupsListService;
    cardsGroupsEditorService: CardsGroupsEditorService;
    errorService: ErrorService;
    googleAuthService: GoogleAuthService;
    googleBackupsService: GoogleBackupsService;
    spinnerService: SpinnerService;
    confirmDialogService: ConfirmDialogService;
    cardsEditorService: CardsEditorService;
    cardsListService: CardsService;
    cardsRepeaterService: CardsRepeaterService;
    localBackupsService: LocalBackupsService;
    settingsService: SettingsService;
    cardViewerService: CardViewerService;
    selectionDialogService: SelectionDialogService;
    toolbarService: ToolbarService;
    statisticService: StatisticService;
}