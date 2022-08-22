import {IRepeater} from "../../../common/types/IRepeater";

export const getRepeaterByID = (repeaters: IRepeater[], repeaterID: number) => {
    const repeaterIndex = repeaters.findIndex((repeater) => {
        return repeater.id === repeaterID;
    })
    return repeaters[repeaterIndex];
}