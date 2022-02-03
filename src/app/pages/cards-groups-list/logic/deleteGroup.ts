import {ICardsGroup} from '../../../types/ICardsGroup';

export const deleteGroup = (groupID: number, cardsGroups: ICardsGroup[]) => {
    return cardsGroups.filter((cardGroup) => {
        return cardGroup.id !== groupID;
    });
};
