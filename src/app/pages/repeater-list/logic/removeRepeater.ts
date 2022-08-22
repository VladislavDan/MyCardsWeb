import {IRepeater} from "../../../common/types/IRepeater";

export const removeRepeater = (repeaters: IRepeater[], repeaterID: number) => {
    const repeaterIndex = repeaters.findIndex((repeater) => repeater.id === repeaterID);

    return repeaters.filter((repeater) => repeater.id !== repeaters[repeaterIndex].id);
}