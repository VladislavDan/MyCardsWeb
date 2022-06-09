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
            const foundCardIndex = selectedCardsIDs.findIndex((cardID) => {
                return cardID === card.id
            })

            if(foundCardIndex > -1) {
                const foundedCard = cardsGroup.cards[foundCardIndex];
                selectedCards.push({
                    ...foundedCard,
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