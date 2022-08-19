import {IRepeater} from "../../../common/types/IRepeater";

export const updateExistRepeater = (
    repeaters: IRepeater[],
    repeater: IRepeater
) => {
    const repeaterIndex = repeaters.findIndex((item) => item.id === repeater.id);
    repeaters[repeaterIndex] = {
        ...repeaters[repeaterIndex],
        cardsGroupsIDs: repeater.cardsGroupsIDs,
        name: repeater.name
    }
}