import {IRepeater} from "../../../common/types/IRepeater";

export const updateGroupsIDs = (selectedGroups: { [key: number]: boolean }, repeater: IRepeater): IRepeater => {
    const cardsGroupsIDs: number[] = [];
    Object.keys(selectedGroups).forEach((groupID) => {
        const id = Number(groupID);
        if (selectedGroups[id]) {
            cardsGroupsIDs.push(id);
        }
    });
    return {
        ...repeater,
        cardsGroupsIDs
    }
}