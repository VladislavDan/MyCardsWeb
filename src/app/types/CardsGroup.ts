import {Card} from './Card';

export interface CardsGroup {
    nameCardsGroup: string;
    id: string;
    percentRepeatedCards?: number;
    dateRepeating?: number
    cards: Card[]
}
