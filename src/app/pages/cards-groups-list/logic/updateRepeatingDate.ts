import {ICardsGroup} from '../../../types/ICardsGroup';
import {ICard} from '../../../types/ICard';

export const updateRepeatingDate = () => {
    return (cardsGroups: ICardsGroup[]) => {
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
};
