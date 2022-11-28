import {getCardsService} from 'src/app/pages/cards/getCardsService';
import {ConfirmDialogService} from '../../../parts/confirm-dialog/ConfirmDialogService';
import {SelectionDialogService} from '../../../parts/selection-dialog/SelectionDialogService';

export interface ICardsContainer {
    cardsListService: getCardsService;
    confirmDialogService: ConfirmDialogService;
    selectionDialogService: SelectionDialogService;
}