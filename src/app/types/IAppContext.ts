import {Card} from './Card';

export interface IAppContext {
    cards: Card[],

    updateContext: () => void
}
