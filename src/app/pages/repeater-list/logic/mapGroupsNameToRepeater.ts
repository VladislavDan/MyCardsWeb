import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {IRepeater} from '../../../common/types/IRepeater';

export const mapGroupsNameToRepeater = (
    cardsGroups: ICardsGroup[],
    repeaters: IRepeater[]
) => {
    return repeaters.map((repeater) => {
        const groupsNames: string[] = []
        cardsGroups.forEach((cardsGroup) => {
            const isCardsGroupInRepeater = repeater.cardsGroupsIDs.findIndex((cardsGroupId) => {
                return cardsGroupId === cardsGroup.id;
            }) > -1;
            if (isCardsGroupInRepeater) {
                groupsNames.push(cardsGroup.nameCardsGroup);
            }
        })
        return {
            ...repeater,
            groupsNames
        }
    })
}