import {ISimplifiedCardsGroup} from '../../../common/types/ISimplifiedCardsGroup';

export const addCurrentGroupToSimplifiedGroup = (cardsGroupID: number, cardsGroups: ISimplifiedCardsGroup[]) => {
    let currentCardsGroup = cardsGroups.find((cardGroup: ISimplifiedCardsGroup) => cardsGroupID === cardGroup.id);

    return {
        currentCardsGroup,
        cardsGroups
    }
};
