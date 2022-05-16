import {ICard} from '../../../common/types/ICard';
import {IRangeOfKnowledge} from '../../../common/types/IRangeOfKnowledge';
import {IStatistic} from '../../../common/types/IStatistic';

export const getStatistic = (cards: ICard[]): IStatistic => {

    const statisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    cards.forEach((card: ICard) => {
        if (card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS) {
            statisticValue.inProgress = statisticValue.inProgress + 1
        } else if (card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
            statisticValue.todo = statisticValue.todo + 1
        } else {
            statisticValue.done = statisticValue.done + 1
        }
    });

    return statisticValue;
};
