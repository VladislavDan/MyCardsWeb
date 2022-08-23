import {IRepeater} from "../../../common/types/IRepeater";
import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";

export const updateRepeatersProgress = (
    cardsGroups: ICardsGroup[],
    repeaters: IRepeater[]
) => {
    repeaters.forEach((repeater) => {
        let cardsCount = 0;
        let repeatedCardsCount = 0;

        cardsGroups.forEach((cardsGroup) => {
            const isCardsGroupInRepeater = repeater.cardsGroupsIDs.findIndex(
                (id) => cardsGroup.id === id
            ) > -1

            if (isCardsGroupInRepeater) {
                cardsCount = cardsCount + cardsGroup.cards.length;
                cardsGroup.cards.forEach((card) => {
                    if (card.rangeOfKnowledge === IRangeOfKnowledge.DONE) {
                        repeatedCardsCount++;
                    }
                })
            }
        });

        repeater.percentRepeatedCards = repeatedCardsCount / cardsCount * 100;
    })
    return repeaters;
}