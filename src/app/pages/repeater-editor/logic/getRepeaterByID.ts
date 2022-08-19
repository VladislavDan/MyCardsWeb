import {IRepeater} from "../../../common/types/IRepeater";

export const getRepeaterByID = (repeaters: IRepeater[], id: number) => {
    const repeaterIndex = repeaters.findIndex((item) => item.id === id);
    return repeaters[repeaterIndex]
}