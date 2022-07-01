import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {ICard} from '../../../common/types/ICard';

export const getCardsByIDs = (cardsGroups: ICardsGroup[], cardsIDs: number[]) => {

    let foundCards: Array<ICard> = [];

    cardsGroups.forEach((cardsGroup) => {
        cardsGroup.cards.forEach((card) => {
            const foundIndex = cardsIDs.findIndex((value) => value === card.id)
            if (foundIndex > -1) {
                foundCards.push(card);
            }
        })
    });

    return foundCards;
};
