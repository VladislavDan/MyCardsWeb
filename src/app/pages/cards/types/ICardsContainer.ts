import {CardsService} from "../CardsService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";
import {SelectionDialogService} from "../../../parts/selection-dialog/SelectionDialogService";

export interface ICardsContainer {
    cardsListService: CardsService;
    confirmDialogService: ConfirmDialogService;
    selectionDialogService: SelectionDialogService;
}