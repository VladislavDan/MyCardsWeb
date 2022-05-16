import {ICardsGroup} from '../../../common/types/ICardsGroup';

export const sortByRepeatingDate = (cardsGroups: ICardsGroup[]) => {
    return cardsGroups.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
        if (firstCardGroup.repeatingDate && secondCardsGroup.repeatingDate) {
            return secondCardsGroup.repeatingDate - firstCardGroup.repeatingDate;
        } else {
            return 0;
        }
    })
};
