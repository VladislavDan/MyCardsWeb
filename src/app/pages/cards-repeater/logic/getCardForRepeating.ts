import {ICard} from '../../../types/ICard';
import {IRangeOfKnowledge} from '../../../types/IRangeOfKnowledge';

export const getCardForRepeating = (cards: ICard[]) => {

    let foundCard = cards.find((card: ICard) => {
        return card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO;
    });

    if (!foundCard) {
        foundCard = cards.find((card: ICard) => {
            return card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS;
        });
    }

    if (cards.length === 1) {
        foundCard = cards[0]
    }

    return foundCard
};
