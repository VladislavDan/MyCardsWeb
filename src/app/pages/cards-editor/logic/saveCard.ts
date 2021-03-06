import {ICard} from '../../../common/types/ICard';
import {ICardsGroup} from '../../../common/types/ICardsGroup';

export const saveCard = (cardsGroupID: number, card: ICard, cardsGroups: ICardsGroup[]) => {

    if (card.id === -1) {
        card.id = new Date().getTime();
    }
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
