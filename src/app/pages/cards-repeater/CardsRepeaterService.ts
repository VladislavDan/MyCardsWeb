import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {Channel} from '../../common/Channel';
import {IStatistic} from '../../types/IStatistic';
import {ISettings} from '../../types/ISettings';

export class CardsRepeaterService {
    public currentCardChannel: Channel<number | null, ICard | null>;
    public cardChannel: Channel<{ cardsGroupID: number | null, cardID: number | null }, ICard | undefined>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public statisticChannel: Channel<string, IStatistic>;

    private statisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    constructor(private storageService: StorageService) {
        this.cardChannel = new Channel(({cardsGroupID, cardID}) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID, cardID)),
            switchMap((cards: ICard[]) => this.getCardForRepeating(cards))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.writeRangeOfKnowledge(args);
        });

        this.currentCardChannel = new Channel((cardsGroupID: number | null) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID)),
            map((cards: ICard[]) => {
                if (cards.length === 1) {
                    return cards[0];
                } else {
                    return null;
                }
            })
        ));

        this.statisticChannel = new Channel(() => of(this.statisticValue));
    }

    private getCards(cardsGroupID?: number | null, cardID?: number | null) {
        return this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {

                const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
                    return !cardsGroupID || cardsGroup.id === cardsGroupID;
                });

                let foundCards: Array<ICard> = [];

                if (foundCardsGroup) {
                    foundCards = foundCardsGroup.cards;

                    if (cardID) {

                        const foundCard = foundCards.find((card: ICard) => {
                            return card.id === cardID;
                        });

                        if (foundCard) {
                            foundCards = [];
                            foundCards.push(foundCard)
                        }
                    }
                }

                return foundCards;
            })
        );
    }

    private writeRangeOfKnowledge = (args: IRepeatingArgs) => {
        return of('').pipe(
            switchMap(() => this.storageService.getBackup()),
            map((cardsGroups: ICardsGroup[]) => {
                cardsGroups.forEach((cardsGroup: ICardsGroup) => {
                    if (!args.cardsGroupID || cardsGroup.id === args.cardsGroupID) {
                        cardsGroup.cards.forEach((card: ICard) => {
                            if (!args.cardID || card.id === args.cardID) {
                                if (args.isKnown && card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS) {
                                    card.rangeOfKnowledge = IRangeOfKnowledge.DONE;
                                } else if (args.isKnown && card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
                                    card.rangeOfKnowledge = IRangeOfKnowledge.DONE;
                                } else if (!args.isKnown && card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
                                    card.rangeOfKnowledge = IRangeOfKnowledge.IN_PROGRESS;
                                }
                            }
                        });
                    }
                });


                return cardsGroups;
            }),
            switchMap((cardsGroups: ICardsGroup[]) => this.storageService.setBackup(cardsGroups))
        )
    };

    private getCardForRepeating(cards: ICard[]): Observable<ICard | undefined> {
        return this.storageService.getSettings().pipe(
            map((settings: ISettings) => {

                if (settings.isRandomRepeating) {
                   cards = this.shuffleCards(cards);
                }

                let foundCard = cards.find((card: ICard) => {
                    return card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO;
                });

                if (!foundCard) {
                    foundCard = cards.find((card: ICard) => {
                        return card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS;
                    });
                }

                if (cards.length === 1) {
                    foundCard = cards[0]
                }

                this.updateStatistic(cards);

                return foundCard
            })
        )
    }

    private updateStatistic(cards: ICard[]): void {

        this.statisticValue = {
            inProgress: 0,
            todo: 0,
            done: 0
        };

        cards.forEach((card: ICard) => {
            if (card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS) {
                this.statisticValue.inProgress = this.statisticValue.inProgress + 1
            } else if (card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
                this.statisticValue.todo = this.statisticValue.todo + 1
            } else {
                this.statisticValue.done = this.statisticValue.done + 1
            }
        });
    }

    private shuffleCards(array: ICard[]) {
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
    }
}
