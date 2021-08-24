import {of, Subject, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {localStorageManager} from '../../common/managers/LocalStoragManager';
import {CardsGroup} from '../../types/CardsGroup';
import {spinnerManager} from '../../elements/spinner-container/SpinnerManager';
import {errorManager} from '../../elements/error-container/ErrorManager';
import {RangeOfKnowledge} from '../../types/RangeOfKnowledge';

class CardsRepeaterManager {
    public cardChannel: Subject<any>;


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
