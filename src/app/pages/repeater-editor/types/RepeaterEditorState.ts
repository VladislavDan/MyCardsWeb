import {ICardsGroup} from "../../../common/types/ICardsGroup";

export interface RepeaterEditorState {
    cardsGroups: ICardsGroup[];
    selectedGroups: {
        [key: number]: boolean;
    }
}