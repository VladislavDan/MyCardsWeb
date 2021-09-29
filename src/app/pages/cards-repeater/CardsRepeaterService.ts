import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {localStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {Channel} from '../../common/Channel';
import {IStatistic} from '../../types/IStatistic';

class CardsRepeaterService {
    public cardChannel: Channel<string, ICard | undefined>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public statisticChannel: Channel<string, IStatistic>;

    constructor() {
        this.cardChannel = new Channel((cardsGroupID: string) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID)),
            map((cards: ICard[]) => this.getCardForRepeating(cards))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.writeRangeOfKnowledge(args);
        });

        this.statisticChannel = new Channel((cardsGroupID: string) => {
            return this.getStatistic(cardsGroupID);
        });
    }

    getCards(cardsGroupID: string) {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
            map((cardsGroups: ICardsGroup[]) => {
                const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
                    return !cardsGroupID || cardsGroup.id === cardsGroupID;
                });

                return foundCardsGroup ? foundCardsGroup.cards : [];
            })
        )
    }

    writeRangeOfKnowledge = (args: IRepeatingArgs) => {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
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
            switchMap((cardsGroups: ICardsGroup[]) => localStorageService.setBackupToStorage(cardsGroups))
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

    getStatistic(cardsGroupID: string): Observable<IStatistic> {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
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

export const cardsRepeaterManager = new CardsRepeaterService();
