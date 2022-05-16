import {CardViewerService} from "../CardViewerService";
import {CardsEditorService} from "../../cards-editor/CardsEditorService";

export interface ICardViewerContainer {
    cardViewerService: CardViewerService;
    cardsEditorService: CardsEditorService;
}