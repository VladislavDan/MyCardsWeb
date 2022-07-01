import {ICard} from "../../../common/types/ICard";
import {ISimplifiedCardsGroup} from "../../../common/types/ISimplifiedCardsGroup";

export interface CardsEditorState {
    card: ICard;
    currentCardsGroup: ISimplifiedCardsGroup;
    cardsGroups: ISimplifiedCardsGroup[];
}