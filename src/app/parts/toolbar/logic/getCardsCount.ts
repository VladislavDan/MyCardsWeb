import {ICardsGroup} from '../../../common/types/ICardsGroup';

export const getCardsCount = (backup: ICardsGroup[], cardsGroupsId: number) => {
    const cardsGroupIndex = backup.findIndex((group) => {
        return group.id === cardsGroupsId;
    });
    if (cardsGroupIndex > -1) {
        return backup[cardsGroupIndex].cards.length;
    } else {
        return -1;
    }
}