import {ICardsGroup} from '../types/ICardsGroup';
import {ICard} from '../types/ICard';

export const deleteSingleCard = (cardID: number, cardsGroups: ICardsGroup[]) => {
    const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => {
        const cardIndex = cardGroup.cards.findIndex((card) => {
            return card.id === cardID;
        })

        return cardIndex > -1
    });
    let cardIndex = -1;

    if (cardGroupIndex >= 0) {
        cardIndex = cardsGroups[cardGroupIndex].cards.findIndex((item: ICard) => cardID === item.id)
    }

    if (cardGroupIndex >= 0 && cardIndex >= 0) {
        cardsGroups[cardGroupIndex].cards = cardsGroups[cardGroupIndex].cards.filter((card: ICard) => card.id !== cardID);
    }

    return cardsGroups;
};
