import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {ICard} from "../../../common/types/ICard";
import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";

export const updateObsoleteStatus = (
    cardsGroups: ICardsGroup[],
    timeInProgress: number,
    timeInDone: number
): ICardsGroup[] => {

    if(timeInProgress < 1 && timeInDone < 1) {
        return cardsGroups;
    }

    const millisecondsInDay = 86400000;
    const currentDate = new Date().getTime();
    const timeInProgressMilliseconds = timeInProgress * millisecondsInDay;
    const timeInDoneMilliseconds = timeInDone * millisecondsInDay;

    cardsGroups.forEach((cardsGroup: ICardsGroup) => {
        cardsGroup.cards.forEach((card: ICard) => {
            const differences = currentDate - card.dateRepeating;

            if(card.rangeOfKnowledge === IRangeOfKnowledge.DONE && differences > timeInDoneMilliseconds) {
                card.rangeOfKnowledge = IRangeOfKnowledge.IN_PROGRESS;
            }

            if(card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS && differences > timeInProgressMilliseconds) {
                card.rangeOfKnowledge = IRangeOfKnowledge.TO_DO;
            }
        });
    })

    return cardsGroups;
}