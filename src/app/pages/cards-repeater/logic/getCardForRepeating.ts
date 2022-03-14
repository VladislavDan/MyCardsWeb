import {ICard} from '../../../types/ICard';
import {IRangeOfKnowledge} from '../../../types/IRangeOfKnowledge';

export const getCardForRepeating = (cards: ICard[], isRandomRepeating: boolean) => {

    let foundCard

    if(!isRandomRepeating) {
        foundCard = cards.find((card: ICard) => {
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
    } else {
        const cardsWithoutDone = cards.filter((card: ICard) => {
            return card.rangeOfKnowledge !== IRangeOfKnowledge.DONE
        })
        foundCard = cardsWithoutDone[0];
    }

    return foundCard
};
