import {ICardsGroup} from '../../../types/ICardsGroup';
import {ICard} from '../../../types/ICard';

export const getCards = (cardsGroups: ICardsGroup[], cardsGroupID: number | null, cardID?: number | null) => {

    const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
        return !cardsGroupID || cardsGroup.id === cardsGroupID;
    });

    let foundCards: Array<ICard> = [];

    if (foundCardsGroup) {
        foundCards = foundCardsGroup.cards;

        if (cardID) {

            const foundCard = foundCards.find((card: ICard) => {
                return card.id === cardID;
            });

            if (foundCard) {
                foundCards = [];
                foundCards.push(foundCard)
            }
        }
    }

    return foundCards;
};
