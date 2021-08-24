import {ICard} from './ICard';

export interface CardsGroup {
    nameCardsGroup: string;
    id: string;
    percentRepeatedCards?: number;
    dateRepeating?: number
    cards: ICard[]
}
