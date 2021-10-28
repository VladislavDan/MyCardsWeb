import {IRangeOfKnowledge} from './IRangeOfKnowledge';

export interface ICard {
    id: number;
    rangeOfKnowledge: IRangeOfKnowledge;
    answer: string;
    question: string;
    dateRepeating: number;
}
