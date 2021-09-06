import {Subject} from 'rxjs';
import {of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {localStorageManager} from '../../common/managers/LocalStoragService';
import {CardsGroup} from '../../types/CardsGroup';
import {spinnerManager} from '../../elements/spinner-container/SpinnerManager';
import {errorManager} from '../../elements/error-container/ErrorService';

class CardsListManager {
    public cardsChannel: Subject<any>;


    constructor() {
        this.cardsChannel = new Subject<string>().pipe(
            switchMap((cardsGroupID: string) => this.getCards(cardsGroupID)),
            catchError((error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot load cards');
                return throwError(error);
            })
        ) as Subject<ICard[]>;
    }

    getCards(cardsGroupID: string) {
        return of('').pipe(
            switchMap(() => localStorageManager.getBackupFromStorage()),
            map((cardsGroups: CardsGroup[]) => {
                const foundCardsGroup = cardsGroups.find((cardsGroup: CardsGroup) => {
                    return cardsGroup.id === cardsGroupID;
                });

                return foundCardsGroup ? foundCardsGroup.cards : [];
            })
        )
    }

}

export const cardsListManager = new CardsListManager();
