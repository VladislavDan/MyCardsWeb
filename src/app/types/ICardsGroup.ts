import {ICard} from './ICard';

export interface ICardsGroup {
    nameCardsGroup: string;
    id: string;
    percentRepeatedCards?: number;
    dateRepeating?: number
    cards: ICard[]
}
