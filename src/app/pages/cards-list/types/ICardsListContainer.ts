import {CardsListService} from "../CardsListService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";
import {SelectionDialogService} from "../../../parts/selection-dialog/SelectionDialogService";

export interface ICardsListContainer {
    cardsListService: CardsListService;
    confirmDialogService: ConfirmDialogService;
    selectionDialogService: SelectionDialogService;
}