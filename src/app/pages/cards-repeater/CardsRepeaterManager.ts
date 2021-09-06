import {of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {localStorageManager} from '../../common/managers/LocalStoragService';
import {CardsGroup} from '../../types/CardsGroup';
import {spinnerManager} from '../../elements/spinner-container/SpinnerManager';
import {errorManager} from '../../elements/error-container/ErrorService';
import {RangeOfKnowledge} from '../../types/RangeOfKnowledge';
import {IChannel} from '../../types/IChannel';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';

class CardsRepeaterManager {
    public cardChannel: Subject<any>;
    public repeatingResultChannel: Subject<IChannel<IRepeatingArgs, void>>;


    constructor() {
        this.cardChannel = new Subject<string>().pipe(
            switchMap((cardsGroupID: string) => this.getCards(cardsGroupID)),
            map((cards: ICard[]) => this.getCardForRepeating(cards)),
            catchError((error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot load cards');
                return throwError(error);
            })
        ) as Subject<ICard | undefined>;

        this.repeatingResultChannel = new Subject<IChannel<IRepeatingArgs, void>>().pipe(
            switchMap(({args}) => this.writeRangeOfKnowledge(args)),
            catchError((error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot load cards');
                return throwError(error);
            })
        );
    }

    getCards(cardsGroupID: string) {
        return of('').pipe(
            switchMap(() => localStorageManager.getBackupFromStorage()),
            map((cardsGroups: CardsGroup[]) => {
                const foundCardsGroup = cardsGroups.find((cardsGroup: CardsGroup) => {
                    return !cardsGroupID || cardsGroup.id === cardsGroupID;
                });

                return foundCardsGroup ? foundCardsGroup.cards : [];
            })
        )
    }

    writeRangeOfKnowledge(args: IRepeatingArgs) {
        return of('').pipe(
            switchMap(() => localStorageManager.getBackupFromStorage()),
            map((cardsGroups: CardsGroup[]) => {
                cardsGroups.forEach((cardsGroup: CardsGroup) => {
                    if(!args.cardsGroupID || cardsGroup.id === args.cardsGroupID) {
                        cardsGroup.cards.forEach((card: ICard)=>{
                            if(!args.cardID || card.id === args.cardID) {
                                if(args.isKnown && card.rangeOfKnowledge === RangeOfKnowledge.IN_PROGRESS) {
                                    card.rangeOfKnowledge = RangeOfKnowledge.DONE;
                                } else if(args.isKnown && card.rangeOfKnowledge === RangeOfKnowledge.TO_DO) {
                                    card.rangeOfKnowledge = RangeOfKnowledge.DONE;
                                } else if(!args.isKnown && card.rangeOfKnowledge === RangeOfKnowledge.TO_DO) {
                                    card.rangeOfKnowledge = RangeOfKnowledge.IN_PROGRESS;
                                }
                            }
                        });
                    }
                });



                return cardsGroups;
            }),
            switchMap((cardsGroups: CardsGroup[]) => localStorageManager.setBackupToStorage(cardsGroups))
        )
    }

    getCardForRepeating(cards: ICard[]): ICard | undefined {
        let foundCard= cards.find((card: ICard) => {
            return card.rangeOfKnowledge === RangeOfKnowledge.TO_DO;
        });

        if(!foundCard) {
            foundCard= cards.find((card: ICard) => {
                return card.rangeOfKnowledge === RangeOfKnowledge.IN_PROGRESS;
            });
        }

        return foundCard
    }

}

export const cardsRepeaterManager= new CardsRepeaterManager();
