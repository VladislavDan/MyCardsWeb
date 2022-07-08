import {ISimplifiedCardsGroup} from '../../../common/types/ISimplifiedCardsGroup';
import {defaultSimplifiedGroupValue} from "../../../common/Constants";

export const addCurrentGroupToSimplifiedGroup = (cardsGroupID: number, cardsGroups: ISimplifiedCardsGroup[]) => {
    let currentCardsGroup = cardsGroups.find((cardGroup: ISimplifiedCardsGroup) => cardsGroupID === cardGroup.id);

    return {
        currentCardsGroup: currentCardsGroup || defaultSimplifiedGroupValue,
        cardsGroups
    }
};
