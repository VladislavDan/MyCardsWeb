import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {ICard} from '../../../common/types/ICard';
import {IRangeOfKnowledge} from '../../../common/types/IRangeOfKnowledge';

export const countRepeatedCardsPercent = (cardsGroups: ICardsGroup[]) => {
    cardsGroups.map((cardsGroup: ICardsGroup) => {
        let statusDone = 0;
        cardsGroup.cards.forEach((card: ICard) => {
            if (card.rangeOfKnowledge === IRangeOfKnowledge.DONE) {
                statusDone++
            }
        });
        cardsGroup.percentRepeatedCards = statusDone / cardsGroup.cards.length * 100;
        return cardsGroup;
    });
    return cardsGroups;
};
