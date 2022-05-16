import {ICard} from './ICard';

export interface ICardsGroup {
    nameCardsGroup: string;
    id: number;
    percentRepeatedCards?: number;
    repeatingDate?: number
    cards: ICard[]
}
