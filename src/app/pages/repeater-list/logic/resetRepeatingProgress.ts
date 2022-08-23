import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {IRepeater} from "../../../common/types/IRepeater";
import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";

export const resetRepeatingProgress = (
    cardsGroups: ICardsGroup[],
    repeater: IRepeater
) => {
    cardsGroups.forEach((cardsGroup) => {
        const isCardsGroupInRepeater = repeater.cardsGroupsIDs.findIndex(
            (id) => cardsGroup.id === id
        ) > -1

        if (isCardsGroupInRepeater) {
            cardsGroup.cards.forEach((card) => {
                if (card.rangeOfKnowledge !== IRangeOfKnowledge.TO_DO) {
                    card.rangeOfKnowledge = IRangeOfKnowledge.TO_DO
                }
            })
        }
    })
    return cardsGroups;
}