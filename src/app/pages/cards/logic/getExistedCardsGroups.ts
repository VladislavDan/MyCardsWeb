import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const getExistedCardsGroups = (cardsGroups: ICardsGroup[]) => {
    return cardsGroups.map((cardsGroup) => {
        return {
            id: cardsGroup.id,
            label: cardsGroup.nameCardsGroup
        }
    })
}