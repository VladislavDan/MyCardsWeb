import {IRangeOfKnowledge} from '../types/IRangeOfKnowledge';

export const defaultAppState = {
    height: 0,
    width: 0,
    updateContext: () => {
    }
};

export const DATE_FORMAT = "dd-MM-yyyy";
export const STORE_NAME = "cards-store";

export const initialCard = {
    rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
    answer: '',
    question: '',
    dateRepeating: 0,
    id: new Date().getTime()
};
