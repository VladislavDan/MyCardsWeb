import {RepeaterEditorState} from "../types/RepeaterEditorState";
import {defaultRepeater} from "../../../common/defaults/defaultRepeater";

export const initialState: RepeaterEditorState = {
    cardsGroups: [],
    selectedGroups: {},
    repeater: defaultRepeater
}