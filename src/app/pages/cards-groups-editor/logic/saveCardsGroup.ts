import {ICardsGroup} from '../../../types/ICardsGroup';

export const saveCardsGroup = (editedCardGroup: ICardsGroup) => {
    return (cardsGroups: ICardsGroup[]) => {
        const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => editedCardGroup.id === cardGroup.id);

        if (cardGroupIndex < 0) {
            cardsGroups.push(editedCardGroup);
        } else {
            cardsGroups[cardGroupIndex] = editedCardGroup;
        }

        return cardsGroups;
    };
};
