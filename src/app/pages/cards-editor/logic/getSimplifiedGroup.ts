import {ICardsGroup} from '../../../types/ICardsGroup';
import {ISimplifiedCardsGroup} from '../../../types/ISimplifiedCardsGroup';

export const getSimplifiedGroup = (cardsGroups: ICardsGroup[]): ISimplifiedCardsGroup[] => {

        return cardsGroups.map((cardsGroup: ICardsGroup): ISimplifiedCardsGroup => {
            return {
                id: cardsGroup.id,
                nameCardsGroup: cardsGroup.nameCardsGroup
            }
        });
};
