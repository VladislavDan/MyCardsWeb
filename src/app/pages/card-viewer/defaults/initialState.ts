import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";

export const initialState = {
    card: {
        id: -1,
        question: '',
        answer: '',
        rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
        dateRepeating: 0
    },
    isQuestionSide: true,
    isEditable: false
}