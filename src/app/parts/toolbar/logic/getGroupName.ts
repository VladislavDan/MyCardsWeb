import {ICardsGroup} from '../../../common/types/ICardsGroup';

export const getGroupName = (backup: ICardsGroup[], cardsGroupsId: number) => {
    const cardsGroupIndex = backup.findIndex((group) => {
        return group.id === cardsGroupsId;
    });
    if (cardsGroupIndex > -1) {
        return backup[cardsGroupIndex].nameCardsGroup
    } else {
        return '';
    }
}