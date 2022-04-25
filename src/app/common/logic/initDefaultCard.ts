import {IRangeOfKnowledge} from "../../types/IRangeOfKnowledge";

export const initDefaultCard = () => {
    return {
        rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
        answer: '',
        question: '',
        dateRepeating: 0,
        id: new Date().getTime()
    }
}