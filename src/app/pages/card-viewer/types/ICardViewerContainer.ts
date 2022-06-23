import {CardViewerService} from "../CardViewerService";
import {CardsEditorService} from "../../cards-editor/CardsEditorService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";

export interface ICardViewerContainer {
    cardViewerService: CardViewerService;
    cardsEditorService: CardsEditorService;
    confirmDialogService: ConfirmDialogService;
}