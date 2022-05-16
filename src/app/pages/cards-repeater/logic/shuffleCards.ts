import {ICard} from '../../../common/types/ICard';

export const shuffleCards = (array: ICard[]) => {
    const copy = [];
    let length = array.length;
    let randomIndex;

    while (length) {
        randomIndex = Math.floor(Math.random() * array.length);
        if (randomIndex in array) {
            copy.push(array[randomIndex]);
            delete array[randomIndex];
            length--;
        }
    }

    return copy;
};
