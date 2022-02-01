import {ISimplifiedCardsGroup} from '../../../types/ISimplifiedCardsGroup';

export const addCurrentGroupToSimplifiedGroup = (cardsGroupID: number) => {
    return (cardsGroups: ISimplifiedCardsGroup[]) => {

        let currentCardsGroup = cardsGroups.find((cardGroup: ISimplifiedCardsGroup) => cardsGroupID === cardGroup.id);

        return {
            currentCardsGroup,
            cardsGroups
        }
    };
};
