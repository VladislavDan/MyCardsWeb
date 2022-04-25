import {ICardsGroup} from '../../../types/ICardsGroup';
import {ICard} from '../../../types/ICard';

export const getCardsByGroupID = (cardsGroups: ICardsGroup[], cardsGroupID: number | null) => {

    const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
        return !cardsGroupID || cardsGroup.id === cardsGroupID;
    });

    let foundCards: Array<ICard> = [];

    if (foundCardsGroup) {
        foundCards = foundCardsGroup.cards;
    }

    return foundCards;
};