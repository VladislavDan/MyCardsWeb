import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {ICard} from '../../../common/types/ICard';

export const deleteSingleCard = (cardsGroupID: number, cardID: number, cardsGroups: ICardsGroup[]) => {
    const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);
    let cardIndex = -1;

    if (cardGroupIndex >= 0) {
        cardIndex = cardsGroups[cardGroupIndex].cards.findIndex((item: ICard) => cardID === item.id)
    }

    if (cardGroupIndex >= 0 && cardIndex >= 0) {
        cardsGroups[cardGroupIndex].cards = cardsGroups[cardGroupIndex].cards.filter((card: ICard) => card.id !== cardID);
    }

    return cardsGroups;
};
