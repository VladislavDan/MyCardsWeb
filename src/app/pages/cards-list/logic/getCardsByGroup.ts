import {ICardsGroup} from '../../../types/ICardsGroup';

export const getCardsByGroup = (cardsGroupID: number, cardsGroups: ICardsGroup[]) => {
    const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
        return cardsGroup.id === cardsGroupID;
    });

    return foundCardsGroup ? foundCardsGroup.cards : [];
};
