import {Subject, Observable} from 'rxjs';
import {of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {localStorageService} from '../../common/services/LocalStoragService';
import {CardsGroup} from '../../types/CardsGroup';
import {Channel} from '../../common/Channel';
import {spinnerManager} from '../../../App';

class CardsListService {
    public cardsChannel: Channel<string, ICard[]>;


    constructor() {
        this.cardsChannel = new Channel((cardsGroupID: string) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID))
        ));
    }

    getCards(cardsGroupID: string): Observable<ICard[]> {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
            map((cardsGroups: CardsGroup[]) => {
                const foundCardsGroup = cardsGroups.find((cardsGroup: CardsGroup) => {
                    return cardsGroup.id === cardsGroupID;
                });

                return foundCardsGroup ? foundCardsGroup.cards : [];
            })
        )
    }

}

export const cardsListManager = new CardsListService();
