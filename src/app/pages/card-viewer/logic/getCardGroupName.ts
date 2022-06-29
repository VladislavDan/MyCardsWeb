import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const getCardGroupName = (cardsGroups: ICardsGroup[], cardID: number): string => {
    const foundIndex = cardsGroups.findIndex((cardsGroup) => {
        const foundCardIndex = cardsGroup.cards.findIndex((card) => {
            return card.id === cardID;
        })
        return foundCardIndex > -1;
    });
    return foundIndex > -1 ? cardsGroups[foundIndex].nameCardsGroup : 'No name';
}