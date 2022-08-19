import {ICardsGroup} from "../../../common/types/ICardsGroup";
import {IRepeater} from "../../../common/types/IRepeater";

export interface RepeaterEditorState {
    cardsGroups: ICardsGroup[];
    selectedGroups: {
        [key: number]: boolean;
    },
    repeater: IRepeater
}