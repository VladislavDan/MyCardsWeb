import {ICardsGroup} from '../../../types/ICardsGroup';
import {ICard} from '../../../types/ICard';
import {IRangeOfKnowledge} from '../../../types/IRangeOfKnowledge';

export const resetCardProgress = (cardsGroupID: number, cardID: number, cardsGroups: ICardsGroup[]) => {
    const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);
    let cardIndex = -1;

    if (cardGroupIndex >= 0) {
        cardIndex = cardsGroups[cardGroupIndex].cards.findIndex((item: ICard) => cardID === item.id)
    }

    if (cardGroupIndex >= 0 && cardIndex >= 0) {
        cardsGroups[cardGroupIndex].cards[cardIndex].rangeOfKnowledge = IRangeOfKnowledge.TO_DO;
    }

    return cardsGroups;
};
