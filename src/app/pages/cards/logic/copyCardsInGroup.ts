import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {ICard} from "../../../common/types/ICard";

export const copyCardsInGroup = (
    cardsGroups: ICardsGroup[],
    selectedCardsIDs: number[],
    destinationGroupID: number
) => {
    const selectedCards: ICard[] = []

    cardsGroups.forEach((cardsGroup) => {
        cardsGroup.cards.forEach((card, index) => {
            const isSelected = selectedCardsIDs.findIndex((cardID) => {
                return cardID === card.id
            }) > -1

            if (isSelected) {
                selectedCards.push({
                    ...card,
                    id: new Date().getTime() + index * 1000
                });
            }
        });
    });

    cardsGroups.forEach((cardsGroup) => {
        if(cardsGroup.id === destinationGroupID) {
            cardsGroup.cards.push(...selectedCards)
        }
    })

    return cardsGroups;
}