import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';

export class CardsListService {
    public cardsChannel: Channel<number, ICard[]>;
    public resetCardProgressChannel: Channel<{cardID: number, cardsGroupID: number}, ICardsGroup[]>;
    public deleteCardChannel: Channel<{cardID: number, cardsGroupID: number}, ICardsGroup[]>;

    constructor(private storageService: StorageService) {
        this.cardsChannel = new Channel((cardsGroupID: number) => of('').pipe(
            switchMap(() => this.getCards(cardsGroupID))
        ));

        this.resetCardProgressChannel = new Channel(({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {
                const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);
                let cardIndex = -1;

                if(cardGroupIndex >=0) {
                    cardIndex = cardsGroups[cardGroupIndex].cards.findIndex((item: ICard) => cardID === item.id)
                }

                if(cardGroupIndex >= 0 && cardIndex >= 0) {
                    cardsGroups[cardGroupIndex].cards[cardIndex].rangeOfKnowledge = IRangeOfKnowledge.TO_DO;
                }

                return cardsGroups;
            }),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            })
        ));

        this.deleteCardChannel = new Channel(({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {
                const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);
                let cardIndex = -1;

                if(cardGroupIndex >=0) {
                    cardIndex = cardsGroups[cardGroupIndex].cards.findIndex((item: ICard) => cardID === item.id)
                }

                if(cardGroupIndex >= 0 && cardIndex >= 0) {
                    cardsGroups[cardGroupIndex].cards = cardsGroups[cardGroupIndex].cards.filter((card: ICard) => card.id !== cardID);
                }

                return cardsGroups;
            }),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            })
        ));
    }

    getCards(cardsGroupID: number): Observable<ICard[]> {
        return of('').pipe(
            switchMap(() => this.storageService.getBackup()),
            map((cardsGroups: ICardsGroup[]) => {
                const foundCardsGroup = cardsGroups.find((cardsGroup: ICardsGroup) => {
                    return cardsGroup.id === cardsGroupID;
                });

                return foundCardsGroup ? foundCardsGroup.cards : [];
            })
        )
    }
}
