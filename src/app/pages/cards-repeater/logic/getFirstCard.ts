import {ICard} from '../../../types/ICard';

export const getFirstCard = (cards: ICard[]): ICard | null => {
    if (cards.length === 1) {
        return cards[0];
    } else {
        return null;
    }
};
