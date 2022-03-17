import {ICardsGroup} from "../../../types/ICardsGroup";
import {ICard} from "../../../types/ICard";

export const getCardForViewing = (cardsGroups: ICardsGroup[], cardID: number): ICard | undefined => {
    let card;

    for (let i = 0; i < cardsGroups.length; i++) {
        const index = cardsGroups[i].cards.findIndex((card: ICard) => {
            return card.id === cardID
        })

        if (index > -1) {
            card = cardsGroups[i].cards[index];
            return card;
        }
    }

    return card;
}