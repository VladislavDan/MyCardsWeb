import {CardsRepeaterService} from "../CardsRepeaterService";
import {CardsEditorService} from "../../cards-editor/CardsEditorService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";
import {ToolbarService} from "../../../parts/toolbar/ToolbarService";

export interface ICardRepeaterContainer {
    cardsRepeaterService: CardsRepeaterService;
    cardsEditorService: CardsEditorService;
    confirmDialogService: ConfirmDialogService;
    toolbarService: ToolbarService;
}