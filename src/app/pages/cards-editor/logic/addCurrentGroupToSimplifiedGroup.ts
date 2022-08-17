import {ISimplifiedCardsGroup} from '../../../common/types/ISimplifiedCardsGroup';
import {defaultSimplifiedGroup} from "../../../common/defaults/defaultSimplifiedGroup";

export const addCurrentGroupToSimplifiedGroup = (cardsGroupID: number, cardsGroups: ISimplifiedCardsGroup[]) => {
    let currentCardsGroup = cardsGroups.find((cardGroup: ISimplifiedCardsGroup) => cardsGroupID === cardGroup.id);

    return {
        currentCardsGroup: currentCardsGroup || defaultSimplifiedGroup,
        cardsGroups
    }
};
