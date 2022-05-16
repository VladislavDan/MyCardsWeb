import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {ISimplifiedCardsGroup} from '../../../common/types/ISimplifiedCardsGroup';

export const getSimplifiedGroup = (cardsGroups: ICardsGroup[]): ISimplifiedCardsGroup[] => {

        return cardsGroups.map((cardsGroup: ICardsGroup): ISimplifiedCardsGroup => {
            return {
                id: cardsGroup.id,
                nameCardsGroup: cardsGroup.nameCardsGroup
            }
        });
};
