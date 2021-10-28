import {ICard} from './ICard';

export interface ICardsGroup {
    nameCardsGroup: string;
    id: number;
    percentRepeatedCards?: number;
    dateRepeating?: number
    cards: ICard[]
}
