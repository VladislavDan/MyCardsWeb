import {CardsGroupsListService} from "../CardsGroupsListService";
import {ConfirmDialogService} from "../../../parts/confirm-dialog/ConfirmDialogService";

export interface ICardsGroupsListContainer {
    cardsGroupsListService: CardsGroupsListService;
    confirmDialogService: ConfirmDialogService;
}