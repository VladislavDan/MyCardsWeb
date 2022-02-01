import {ICardsGroup} from '../../../types/ICardsGroup';
import {ISimplifiedCardsGroup} from '../../../types/ISimplifiedCardsGroup';

export const getSimplifiedGroup = () => {
    return (cardsGroups: ICardsGroup[]) => {

        return cardsGroups.map((cardsGroup: ICardsGroup): ISimplifiedCardsGroup => {
            return {
                id: cardsGroup.id,
                nameCardsGroup: cardsGroup.nameCardsGroup
            }
        });
    };
};
