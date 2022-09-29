import {GoogleAuthService} from "./app/pages/google-auth/GoogleAuthService";
import {ErrorService} from "./app/parts/error-container/ErrorService";
import {CardsEditorService} from "./app/pages/cards-editor/CardsEditorService";
import {LocalBackupsService} from "./app/pages/local-backup/LocalBackupsService";
import {SpinnerService} from "./app/parts/spinner/SpinnerService";
import {ConfirmDialogService} from "./app/parts/confirm-dialog/ConfirmDialogService";
import {StorageService} from "./app/common/services/StorageService";
import {DataBaseService} from "./app/common/services/DataBaseService";
import {SelectionDialogService} from "./app/parts/selection-dialog/SelectionDialogService";
import {NavigationPanelService} from "./app/parts/navigation-panel/NavigationPanelService";
import {ToolbarService} from "./app/parts/toolbar/ToolbarService";
import {VoiceService} from "./app/common/services/VoiceService";
import {CardsGroupsEditorService} from "./app/pages/cards-groups-editor/CardsGroupsEditorService";
import {CardsGroupsListService} from "./app/pages/cards-groups-list/CardsGroupsListService";
import {GoogleBackupsService} from "./app/pages/google-backups/GoogleBackupsService";
import {CardsService} from "./app/pages/cards/CardsService";
import {CardsRepeaterService} from "./app/pages/cards-repeater/CardsRepeaterService";
import {SettingsService} from "./app/pages/settings/SettingsService";
import {CardViewerService} from "./app/pages/card-viewer/CardViewerService";
import {StatisticService} from "./app/pages/statistic/StatisticService";
import {RepeaterListService} from "./app/pages/repeater-list/RepeaterListService";
import {RepeaterEditorService} from "./app/pages/repeater-editor/RepeaterEditorService";

export const Dependencies = [
    GoogleAuthService,
    ErrorService,
    CardsEditorService,
    LocalBackupsService,
    SpinnerService,
    ConfirmDialogService,
    StorageService,
    DataBaseService,
    SelectionDialogService,
    NavigationPanelService,
    ToolbarService,
    VoiceService,
    CardsGroupsEditorService,
    CardsGroupsListService,
    GoogleBackupsService,
    CardsService,
    CardsRepeaterService,
    SettingsService,
    CardViewerService,
    StatisticService,
    RepeaterListService,
    RepeaterEditorService
];