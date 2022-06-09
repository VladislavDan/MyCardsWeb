import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const deleteCards = (
    cardsGroups: ICardsGroup[],
    selectedCardsIDs: number[]
) => {

    cardsGroups.forEach((cardsGroup) => {
        cardsGroup.cards = cardsGroup.cards.filter((card) => {
            const foundCardIndex = selectedCardsIDs.findIndex((cardID) => {
                return cardID === card.id;
            });

            return foundCardIndex < 0;
        })
    })

    return cardsGroups;
}