import {RangeOfKnowledge} from './RangeOfKnowledge';

export interface Card {
    id: string;
    rangeOfKnowledge: RangeOfKnowledge;
    answer: string;
    question: string;
    dateRepeating: number;
}
