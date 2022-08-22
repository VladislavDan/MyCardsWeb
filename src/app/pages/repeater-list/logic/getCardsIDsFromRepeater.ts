import {IRepeater} from "../../../common/types/IRepeater";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const getCardsIDsFromRepeater = (cardsGroups: ICardsGroup[], repeater: IRepeater) => {
    const idsForRepeating: number[] = [];

    cardsGroups.forEach((cardsGroup) => {
        const cardsGroupIndex = repeater.cardsGroupsIDs.findIndex((id) => id === cardsGroup.id);
        if (cardsGroupIndex >= 0) {
            idsForRepeating.push(...cardsGroup.cards.map((card) => card.id));
        }
    })

    return idsForRepeating;
}