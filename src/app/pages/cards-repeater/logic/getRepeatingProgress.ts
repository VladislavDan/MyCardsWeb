import {ICard} from '../../../common/types/ICard';
import {IRangeOfKnowledge} from '../../../common/types/IRangeOfKnowledge';
import {IRepeatingProgress} from '../../../common/types/IRepeatingProgress';

export const getRepeatingProgress = (cards: ICard[]): IRepeatingProgress => {

    const repeatingProgress = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    cards.forEach((card: ICard) => {
        if (card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS) {
            repeatingProgress.inProgress = repeatingProgress.inProgress + 1
        } else if (card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
            repeatingProgress.todo = repeatingProgress.todo + 1
        } else {
            repeatingProgress.done = repeatingProgress.done + 1
        }
    });

    return repeatingProgress;
};
