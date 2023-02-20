import {GoogleAuthService} from './app/pages/google-auth/GoogleAuthService';
import {ErrorService} from './app/parts/error-dialog/ErrorService';
import {CardsEditorService} from './app/pages/cards-editor/CardsEditorService';
import {LocalBackupsService} from './app/pages/local-backup/LocalBackupsService';
import {SpinnerService} from './app/parts/spinner/SpinnerService';
import {ConfirmDialogService} from './app/parts/confirm-dialog/ConfirmDialogService';
import {StorageService} from './app/common/services/StorageService';
import {DataBaseService} from './app/common/services/DataBaseService';
import {SelectionDialogService} from './app/parts/selection-dialog/SelectionDialogService';
import {NavigationPanelService} from './app/parts/navigation-panel/NavigationPanelService';
import {ToolbarService} from './app/parts/toolbar/ToolbarService';
import {VoiceService} from './app/common/services/VoiceService';
import {CardsGroupsEditorService} from './app/pages/cards-groups-editor/CardsGroupsEditorService';
import {GoogleBackupsService} from './app/pages/google-backups/GoogleBackupsService';
import {CardsService} from './app/pages/cards/CardsService';
import {CardsRepeaterService} from './app/pages/cards-repeater/CardsRepeaterService';
import {SettingsService} from './app/pages/settings/SettingsService';
import {CardViewerService} from './app/pages/card-viewer/CardViewerService';
import {StatisticService} from './app/pages/statistic/StatisticService';
import {RepeaterListService} from './app/pages/repeater-list/RepeaterListService';
import {RepeaterEditorService} from './app/pages/repeater-editor/RepeaterEditorService';
import {IDependenciesMap} from './MyTools/react-di/types/IDependenciesMap';
import {IDependenciesNames} from './app/common/types/IDependenciesNames';
import {CardsGroupsListService} from './app/pages/cards-groups-list/CardsGroupsListService';

export const DependenciesMap: IDependenciesMap = {
    [IDependenciesNames.GoogleAuthService]: {
        dependencyConstructor: GoogleAuthService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.ErrorService]: {
        dependencyConstructor: ErrorService,
        arguments: []
    },
    [IDependenciesNames.CardsEditorService]: {
        dependencyConstructor: CardsEditorService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.LocalBackupsService]: {
        dependencyConstructor: LocalBackupsService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.SpinnerService]: {
        dependencyConstructor: SpinnerService,
        arguments: []
    },
    [IDependenciesNames.ConfirmDialogService]: {
        dependencyConstructor: ConfirmDialogService,
        arguments: []
    },
    [IDependenciesNames.StorageService]: {
        dependencyConstructor: StorageService,
        arguments: [IDependenciesNames.DataBaseService]
    },
    [IDependenciesNames.DataBaseService]: {
        dependencyConstructor: DataBaseService,
        arguments: []
    },
    [IDependenciesNames.SelectionDialogService]: {
        dependencyConstructor: SelectionDialogService,
        arguments: []
    },
    [IDependenciesNames.NavigationPanelService]: {
        dependencyConstructor: NavigationPanelService,
        arguments: []
    },
    [IDependenciesNames.ToolbarService]: {
        dependencyConstructor: ToolbarService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.VoiceService]: {
        dependencyConstructor: VoiceService,
        arguments: []
    },
    [IDependenciesNames.CardsGroupsEditorService]: {
        dependencyConstructor: CardsGroupsEditorService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.CardsGroupsListService]: {
        dependencyConstructor: CardsGroupsListService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.GoogleBackupsService]: {
        dependencyConstructor: GoogleBackupsService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.CardsService]: {
        dependencyConstructor: CardsService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.CardsRepeaterService]: {
        dependencyConstructor: CardsRepeaterService,
        arguments: [IDependenciesNames.StorageService, IDependenciesNames.VoiceService]
    },
    [IDependenciesNames.SettingsService]: {
        dependencyConstructor: SettingsService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.CardViewerService]: {
        dependencyConstructor: CardViewerService,
        arguments: [IDependenciesNames.StorageService, IDependenciesNames.VoiceService]
    },
    [IDependenciesNames.StatisticService]: {
        dependencyConstructor: StatisticService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.RepeaterListService]: {
        dependencyConstructor: RepeaterListService,
        arguments: [IDependenciesNames.StorageService]
    },
    [IDependenciesNames.RepeaterEditorService]: {
        dependencyConstructor: RepeaterEditorService,
        arguments: [IDependenciesNames.StorageService]
    }
}