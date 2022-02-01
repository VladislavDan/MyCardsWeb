import {ICardsGroup} from '../../../types/ICardsGroup';

export const getEditingCardsGroup = (cardGroupID: number) => {
    return (cardsGroups: ICardsGroup[]) => {

        let cardsGroup = cardsGroups.find((cardGroup: ICardsGroup) => cardGroupID === cardGroup.id);

        if (!cardsGroup) {
            cardsGroup = {
                cards: [],
                nameCardsGroup: '',
                repeatingDate: new Date().getTime(),
                id: new Date().getTime(),
                percentRepeatedCards: 0
            }
        }
        return cardsGroup;
    };
};
