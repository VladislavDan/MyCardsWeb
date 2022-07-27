import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {ICard} from "../../../common/types/ICard";

export const changeCardsGroup = (
    cardsGroups: ICardsGroup[],
    selectedCardsIDs: number[],
    destinationGroupID: number
) => {

    const selectedCards: ICard[] = []

    cardsGroups.forEach((cardsGroup) => {
        cardsGroup.cards.forEach((card) => {
            const isSelected = selectedCardsIDs.findIndex((cardID) => {
                return cardID === card.id
            }) > -1

            if (isSelected) {
                selectedCards.push(card);
            }
        });
        cardsGroup.cards = cardsGroup.cards.filter((card) => {
            const foundCardIndex = selectedCardsIDs.findIndex((cardID) => {
                return cardID === card.id;
            });

            return foundCardIndex < 0;
        })
    })

    cardsGroups.forEach((cardsGroup) => {
        if(cardsGroup.id === destinationGroupID) {
            cardsGroup.cards.push(...selectedCards)
        }
    })

    return cardsGroups;
}