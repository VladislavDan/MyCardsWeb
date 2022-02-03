import {ICard} from '../../../types/ICard';
import {ICardsGroup} from '../../../types/ICardsGroup';

export const saveCard = (cardsGroupID: number, card: ICard, cardsGroups: ICardsGroup[]) => {
        const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);
        let cardIndex = -1;

        if (cardGroupIndex >= 0) {
            cardIndex = cardsGroups[cardGroupIndex].cards.findIndex((item: ICard) => card.id === item.id)
        }

        if (cardGroupIndex >= 0 && cardIndex < 0) {
            cardsGroups[cardGroupIndex].cards.push(card);
        } else if (cardGroupIndex >= 0 && cardIndex >= 0) {
            cardsGroups[cardGroupIndex].cards[cardIndex] = card;
        }

        return cardsGroups;
};
