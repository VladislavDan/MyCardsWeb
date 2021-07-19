import {Card} from './Card'

export interface CardsStatus {
    moreFamiliarCards: Card[];
    lowFamiliarCards: Card[];
    notFamiliarCards: Card[];
    currentCard: Card;
}
