import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const createBackupName = (backup: ICardsGroup[]) => {
    let cardsAmount = 0;
    backup.forEach((cardsGroup) => {
        cardsAmount = cardsAmount + cardsGroup.cards.length
    })
    return `groups(${backup.length})cards(${cardsAmount})`
}