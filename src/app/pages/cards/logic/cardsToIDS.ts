import {ICard} from "../../../common/types/ICard";

export const cardsToIDS = (cards: ICard[]) => {
    return cards.map((card) => card.id)
}