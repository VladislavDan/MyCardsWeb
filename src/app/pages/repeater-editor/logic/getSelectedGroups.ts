import {IRepeater} from "../../../common/types/IRepeater";

export const getSelectedGroups = (repeater: IRepeater) => {
    const selectedGroups: {
        [key: number]: boolean;
    } = {};
    repeater.cardsGroupsIDs.forEach((id) => {
        selectedGroups[id] = true;
    })
    return selectedGroups;
}