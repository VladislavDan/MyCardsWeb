import {RangeOfKnowledge} from './RangeOfKnowledge';

export interface ICard {
    id: string;
    rangeOfKnowledge: RangeOfKnowledge;
    answer: string;
    question: string;
    dateRepeating: number;
}
