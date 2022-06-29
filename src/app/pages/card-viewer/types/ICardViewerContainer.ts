import {CardViewerService} from "../CardViewerService";
import {CardsEditorService} from "../../cards-editor/CardsEditorService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";
import {ToolbarService} from "../../../parts/toolbar/ToolbarService";

export interface ICardViewerContainer {
    cardViewerService: CardViewerService;
    cardsEditorService: CardsEditorService;
    confirmDialogService: ConfirmDialogService;
    toolbarService: ToolbarService;
}