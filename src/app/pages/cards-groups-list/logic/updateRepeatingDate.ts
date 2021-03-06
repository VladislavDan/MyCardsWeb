import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {ICard} from '../../../common/types/ICard';

export const updateRepeatingDate = (cardsGroups: ICardsGroup[]) => {
        cardsGroups.map((cardsGroup: ICardsGroup) => {
            let dateRepeating = 0;
            cardsGroup.cards.forEach((card: ICard) => {
                if (card.dateRepeating > dateRepeating) {
                    dateRepeating = card.dateRepeating
                }
            });
            cardsGroup.repeatingDate = dateRepeating;
            return cardsGroup;
        });
        return cardsGroups;
};
