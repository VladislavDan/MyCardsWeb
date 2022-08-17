import {ICard} from '../../../common/types/ICard';
import {IRangeOfKnowledge} from '../../../common/types/IRangeOfKnowledge';
import {IRepeatingType} from "../../../common/types/IRepeatingType";
import {shuffleCards} from "./shuffleCards";
import {defaultCard} from "../../../common/defaults/defaultCard";

export const getCardForRepeating = (cards: ICard[], repeatingType: IRepeatingType): ICard => {

    let foundCard

    if (repeatingType === IRepeatingType.RANDOM) {
        const cardsWithoutDone = shuffleCards(cards).filter((card: ICard) => {
            return card.rangeOfKnowledge !== IRangeOfKnowledge.DONE
        })
        foundCard = cardsWithoutDone[0];
    } else {
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
    }

    return foundCard || defaultCard
};
