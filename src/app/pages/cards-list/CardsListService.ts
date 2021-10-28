import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {localStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';

class CardsListService {
    public cardsChannel: Channel<number, ICard[]>;

    constructor() {
        this.cardsChannel = new Channel((cardsGroupID: number) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID))
        ));
    }

    getCards(cardsGroupID: number): Observable<ICard[]> {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
            map((cardsGroups: ICardsGroup[]) => {
                const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
                    return cardsGroup.id === cardsGroupID;
                });

                return foundCardsGroup ? foundCardsGroup.cards : [];
            })
        )
    }

}

export const cardsListManager = new CardsListService();
