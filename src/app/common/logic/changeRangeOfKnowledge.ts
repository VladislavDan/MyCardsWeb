import {IRepeatingArgs} from '../types/IRepeatingArgs';
import {ICardsGroup} from '../types/ICardsGroup';
import {ICard} from '../types/ICard';
import {IRangeOfKnowledge} from '../types/IRangeOfKnowledge';

export const changeRangeOfKnowledge = (args: IRepeatingArgs, cardsGroups: ICardsGroup[]) => {
    cardsGroups.forEach((cardsGroup: ICardsGroup) => {
        if (!args.cardsGroupID || cardsGroup.id === args.cardsGroupID) {
            cardsGroup.cards.forEach((card: ICard) => {
                if (!args.cardID || card.id === args.cardID) {
                    if (args.isKnown && card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS) {
                        card.rangeOfKnowledge = IRangeOfKnowledge.DONE;
                    } else if (args.isKnown && card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
                        card.rangeOfKnowledge = IRangeOfKnowledge.DONE;
                    } else if (!args.isKnown && card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
                        card.rangeOfKnowledge = IRangeOfKnowledge.IN_PROGRESS;
                    }
                }
            });
        }
    });


    return cardsGroups;
};
