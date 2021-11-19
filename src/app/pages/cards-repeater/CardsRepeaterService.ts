import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {LocalStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {Channel} from '../../common/Channel';
import {IStatistic} from '../../types/IStatistic';

export class CardsRepeaterService {
    public cardChannel: Channel<{cardsGroupID: number, cardID: number}, ICard | undefined>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public statisticChannel: Channel<number, IStatistic>;

    constructor(private localStorageService: LocalStorageService) {
        this.cardChannel = new Channel(({cardsGroupID, cardID}) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID, cardID)),
            map((cards: ICard[]) => this.getCardForRepeating(cards))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.writeRangeOfKnowledge(args);
        });

        this.statisticChannel = new Channel((cardsGroupID: number) => {
            return this.getStatistic(cardsGroupID);
        });
    }

    getCards(cardsGroupID: number, cardID: number) {
        return this.localStorageService.getBackupFromStorage().pipe(
            map((cardsGroups: ICardsGroup[]) => {

                const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
                    return !cardsGroupID || cardsGroup.id === cardsGroupID;
                });

                let foundCards: Array<ICard> = [];

                if(foundCardsGroup) {
                    foundCards = foundCardsGroup.cards;

                    if(cardID) {

                        const foundCard = foundCards.find((card: ICard) => {
                            return card.id === cardID;
                        });

                        if(foundCard) {
                            foundCards = [];
                            foundCards.push(foundCard)
                        }
                    }
                }

                return foundCards;
            })
        );
    }

    writeRangeOfKnowledge = (args: IRepeatingArgs) => {
        return of('').pipe(
            switchMap(() => this.localStorageService.getBackupFromStorage()),
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
            switchMap((cardsGroups: ICardsGroup[]) => this.localStorageService.setBackupToStorage(cardsGroups))
        )
    };

    getCardForRepeating(cards: ICard[]): ICard | undefined {
        let foundCard = cards.find((card: ICard) => {
            return card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO;
        });

        if (!foundCard) {
            foundCard = cards.find((card: ICard) => {
                return card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS;
            });
        }

        return foundCard
    }

    getStatistic(cardsGroupID: number): Observable<IStatistic> {
        return of('').pipe(
            switchMap(() => this.localStorageService.getBackupFromStorage()),
            map((cardsGroups: ICardsGroup[]) => {

                const statistic: IStatistic = {
                    inProgress: 0,
                    todo: 0,
                    done: 0
                };

                const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
                    return !cardsGroupID || cardsGroup.id === cardsGroupID;
                });

                if(foundCardsGroup) {
                    foundCardsGroup.cards.forEach((card: ICard) => {
                        if(card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS) {
                            statistic.inProgress = statistic.inProgress + 1
                        } else if(card.rangeOfKnowledge === IRangeOfKnowledge.TO_DO) {
                            statistic.todo = statistic.todo + 1
                        } else {
                            statistic.done = statistic.done + 1
                        }
                    });
                }

                return statistic;
            })
        )
    }

}
