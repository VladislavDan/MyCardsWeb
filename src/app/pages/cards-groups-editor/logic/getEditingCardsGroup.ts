import {ICardsGroup} from '../../../common/types/ICardsGroup';

export const getEditingCardsGroup = (cardGroupID: number, cardsGroups: ICardsGroup[]): ICardsGroup => {

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
