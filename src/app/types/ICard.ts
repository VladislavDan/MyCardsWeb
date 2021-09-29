import {IRangeOfKnowledge} from './IRangeOfKnowledge';

export interface ICard {
    id: string;
    rangeOfKnowledge: IRangeOfKnowledge;
    answer: string;
    question: string;
    dateRepeating: number;
}
