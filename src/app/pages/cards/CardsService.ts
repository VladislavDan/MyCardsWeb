import {map, mergeMap, tap} from 'rxjs/operators';

import {ICard} from '../../common/types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {getCardsByGroup} from './logic/getCardsByGroup';
import {resetCardProgress} from './logic/resetCardProgress';
import {deleteCard} from './logic/deleteCard';
import {filterCards} from "./logic/filterCards";
import {IFilter} from "../../common/types/IFilter";
import {changeCardsGroup} from "./logic/changeCardsGroup";
import {of} from "rxjs";
import {selectedItemsObjectToArray} from "./logic/selectedItemsObjectToArray";
import {getExistedCardsGroups} from "./logic/getExistedCardsGroups";

export class CardsService {
    public cardsChannel: Channel<{ cardsGroupID: number, filter: IFilter }, ICard[]>;
    public resetCardProgressChannel: Channel<{ cardID: number, cardsGroupID: number }, ICardsGroup[]>;
    public deleteCardChannel: Channel<{ cardID: number, cardsGroupID: number }, ICardsGroup[]>;
    public movingCardsChannel: Channel<{
        selectedItems: { [key: number]: boolean };
        destinationGroupID: number;
    }, ICardsGroup[]>;
    public existedGroupsIDsChannel: Channel<string, Array<{id: number; label: string}>>

    constructor(private storageService: StorageService) {
        this.cardsChannel = new Channel(({cardsGroupID, filter}) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardsByGroup(cardsGroupID, cardsGroups)),
            map((cards: ICard[]) => filterCards(cards, filter)))
        );

        this.resetCardProgressChannel = new Channel(({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => resetCardProgress(cardsGroupID, cardID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            })
        ));

        this.deleteCardChannel = new Channel(({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => deleteCard(cardsGroupID, cardID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            })
        ));

        this.movingCardsChannel = new Channel(({selectedItems, destinationGroupID}) => storageService.getBackup().pipe(
            mergeMap((cardsGroups) => {
                return of(cardsGroups).pipe(
                    map(() => {
                        return selectedItemsObjectToArray(selectedItems);
                    }),
                    map((selectedCardsIDs) => changeCardsGroup(cardsGroups, selectedCardsIDs, destinationGroupID)),
                    tap((cardsGroups) => {
                        storageService.setBackup(cardsGroups);
                    })
                )
            })
        ))

        this.existedGroupsIDsChannel = new Channel(() => storageService.getBackup().pipe(
            map(getExistedCardsGroups)
        ))
    }
}
