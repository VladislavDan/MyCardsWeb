import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {ICard} from "../../../common/types/ICard";
import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";

export const getCardForViewing = (cardsGroups: ICardsGroup[], cardID: number): ICard => {
    let card = {
        id: -1,
        question: '',
        answer: '',
        rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
        dateRepeating: 0
    };

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