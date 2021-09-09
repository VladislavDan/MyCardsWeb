import {of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {localStorageService} from '../../common/services/LocalStoragService';
import {CardsGroup} from '../../types/CardsGroup';
import {RangeOfKnowledge} from '../../types/RangeOfKnowledge';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {Channel} from '../../common/Channel';

class CardsRepeaterService {
    public cardChannel: Channel<string, ICard | undefined>;
    public repeatingResultChannel: Channel<IRepeatingArgs, CardsGroup[]>;


    constructor() {
        this.cardChannel = new Channel((cardsGroupID: string) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID)),
            map((cards: ICard[]) => this.getCardForRepeating(cards))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.writeRangeOfKnowledge(args);
        });
    }

    getCards(cardsGroupID: string) {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
            map((cardsGroups: CardsGroup[]) => {
                const foundCardsGroup = cardsGroups.find((cardsGroup: CardsGroup) => {
                    return !cardsGroupID || cardsGroup.id === cardsGroupID;
                });

                return foundCardsGroup ? foundCardsGroup.cards : [];
            })
        )
    }

    writeRangeOfKnowledge = (args: IRepeatingArgs) => {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
            map((cardsGroups: CardsGroup[]) => {
                cardsGroups.forEach((cardsGroup: CardsGroup) => {
                    if (!args.cardsGroupID || cardsGroup.id === args.cardsGroupID) {
                        cardsGroup.cards.forEach((card: ICard) => {
                            if (!args.cardID || card.id === args.cardID) {
                                if (args.isKnown && card.rangeOfKnowledge === RangeOfKnowledge.IN_PROGRESS) {
                                    card.rangeOfKnowledge = RangeOfKnowledge.DONE;
                                } else if (args.isKnown && card.rangeOfKnowledge === RangeOfKnowledge.TO_DO) {
                                    card.rangeOfKnowledge = RangeOfKnowledge.DONE;
                                } else if (!args.isKnown && card.rangeOfKnowledge === RangeOfKnowledge.TO_DO) {
                                    card.rangeOfKnowledge = RangeOfKnowledge.IN_PROGRESS;
                                }
                            }
                        });
                    }
                });


                return cardsGroups;
            }),
            switchMap((cardsGroups: CardsGroup[]) => localStorageService.setBackupToStorage(cardsGroups))
        )
    };

    getCardForRepeating(cards: ICard[]): ICard | undefined {
        let foundCard = cards.find((card: ICard) => {
            return card.rangeOfKnowledge === RangeOfKnowledge.TO_DO;
        });

        if (!foundCard) {
            foundCard = cards.find((card: ICard) => {
                return card.rangeOfKnowledge === RangeOfKnowledge.IN_PROGRESS;
            });
        }

        return foundCard
    }

}

export const cardsRepeaterManager = new CardsRepeaterService();
