import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";
import {defaultRepeatingProgressValue} from "../../../common/defaults/defaultRepeatingProgressValue";

export const initialState = {
    card: {
        id: -1,
        question: '',
        answer: '',
        rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
        dateRepeating: 0
    },
    isQuestionSide: true,
    isEditable: false,
    repeatingProgress: defaultRepeatingProgressValue
}