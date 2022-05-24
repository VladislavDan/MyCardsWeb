import {ICardsGroup} from "../types/ICardsGroup";
import {IRepeatingArgs} from "../types/IRepeatingArgs";
import {ICard} from "../types/ICard";

export const refreshCardRepeatingDate = (args: IRepeatingArgs, cardsGroups: ICardsGroup[]) => {
    cardsGroups.forEach((cardsGroup: ICardsGroup) => {
        if (!args.cardsGroupID || cardsGroup.id === args.cardsGroupID) {
            cardsGroup.cards.forEach((card: ICard) => {
                if (!args.cardID || card.id === args.cardID) {
                    card.dateRepeating = new Date().getTime();
                }
            });
        }
    });

    return cardsGroups;
}