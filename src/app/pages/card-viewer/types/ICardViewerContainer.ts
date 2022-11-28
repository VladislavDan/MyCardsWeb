import {getCardViewerService} from 'src/app/pages/card-viewer/services/card-viewer-service/getCardViewerService';
import {CardsEditorService} from '../../cards-editor/CardsEditorService';
import {ConfirmDialogService} from '../../../parts/confirm-dialog/ConfirmDialogService';
import {ToolbarService} from '../../../parts/toolbar/ToolbarService';

export interface ICardViewerContainer {
    cardViewerService: getCardViewerService;
    cardsEditorService: CardsEditorService;
    confirmDialogService: ConfirmDialogService;
    toolbarService: ToolbarService;
}