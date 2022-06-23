import {CardsRepeaterService} from "../CardsRepeaterService";
import {CardsEditorService} from "../../cards-editor/CardsEditorService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";

export interface ICardRepeaterContainer {
    cardsRepeaterService: CardsRepeaterService;
    cardsEditorService: CardsEditorService;
    confirmDialogService: ConfirmDialogService
}