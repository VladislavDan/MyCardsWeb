import {ICardsGroup} from '../../../types/ICardsGroup';
import {ICard} from '../../../types/ICard';
import {IRangeOfKnowledge} from '../../../types/IRangeOfKnowledge';

export const resetRepeatingProgress = (cardsGroupID: number, cardsGroups: ICardsGroup[]) => {

    const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);

    if (cardGroupIndex < 0) {
        return cardsGroups;
    }

    cardsGroups[cardGroupIndex].cards = cardsGroups[cardGroupIndex].cards.map((card: ICard) => {
        return {
            ...card,
            rangeOfKnowledge: IRangeOfKnowledge.TO_DO
        }
    });

    return cardsGroups;
};
