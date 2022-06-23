import {map, mergeMap, tap} from 'rxjs/operators';

import {ICard} from '../../common/types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {getCardsByGroup} from './logic/getCardsByGroup';
import {resetCardProgress} from './logic/resetCardProgress';
import {deleteSingleCard} from '../../common/logic/deleteSingleCard';
import {filterCards} from "./logic/filterCards";
import {IFilter} from "../../common/types/IFilter";
import {changeCardsGroup} from "./logic/changeCardsGroup";
import {of} from "rxjs";
import {selectedItemsObjectToArray} from "./logic/selectedItemsObjectToArray";
import {getExistedCardsGroups} from "./logic/getExistedCardsGroups";
import {copyCardsInGroup} from "./logic/copyCardsInGroup";
import {deleteCards} from "./logic/deleteCards";

export class CardsService {
    public cardsChannel: Channel<{ cardsGroupID: number, filter: IFilter }, ICard[]>;
    public resetCardProgressChannel: Channel<{ cardID: number, cardsGroupID: number }, ICardsGroup[]>;
    public deleteSingleCardChannel: Channel<number, ICardsGroup[]>;
    public movingCardsChannel: Channel<{
        selectedItems: { [key: number]: boolean };
        destinationGroupID: number;
    }, ICardsGroup[]>;
    public copyCardsChannel: Channel<{
        selectedItems: { [key: number]: boolean };
        destinationGroupID: number;
    }, ICardsGroup[]>;
    public deleteCardsChannel: Channel<{ [key: number]: boolean }, ICardsGroup[]>;
    public existedGroupsIDsChannel: Channel<string, Array<{ id: number; label: string }>>

    constructor(private storageService: StorageService) {
        this.cardsChannel = new Channel(
            ({cardsGroupID, filter}) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardsByGroup(cardsGroupID, cardsGroups)),
            map((cards: ICard[]) => filterCards(cards, filter)))
        );

        this.resetCardProgressChannel = new Channel(
            ({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => resetCardProgress(cardsGroupID, cardID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            }))
        );

        this.deleteSingleCardChannel = new Channel(
            (cardID) => storageService.getBackup().pipe(
                map((cardsGroups: ICardsGroup[]) => deleteSingleCard(cardID, cardsGroups)),
                tap((cardsGroups: ICardsGroup[]) => {
                    storageService.setBackup(cardsGroups);
                }))
        );

        this.movingCardsChannel = new Channel((
            {
                selectedItems,
                destinationGroupID
            }
        ) => storageService.getBackup().pipe(
            mergeMap((cardsGroups) => {
                return of(cardsGroups).pipe(
                    map(() => {
                        return selectedItemsObjectToArray(selectedItems);
                    }),
                    map((selectedCardsIDs) => changeCardsGroup(
                        cardsGroups,
                        selectedCardsIDs,
                        destinationGroupID
                    )),
                    tap((cardsGroups) => {
                        storageService.setBackup(cardsGroups);
                    })
                )
            })
        ))

        this.existedGroupsIDsChannel = new Channel(() => storageService.getBackup().pipe(
            map(getExistedCardsGroups)
        ))

        this.copyCardsChannel = new Channel((
            {
                selectedItems,
                destinationGroupID
            }
        ) => storageService.getBackup().pipe(
            mergeMap((cardsGroups) => {
                return of(cardsGroups).pipe(
                    map(() => {
                        return selectedItemsObjectToArray(selectedItems);
                    }),
                    map((selectedCardsIDs) => copyCardsInGroup(
                        cardsGroups,
                        selectedCardsIDs,
                        destinationGroupID
                    )),
                    tap((cardsGroups) => {
                        storageService.setBackup(cardsGroups);
                    })
                )
            })
        ))

        this.deleteCardsChannel = new Channel((
                selectedItems
            ) => storageService.getBackup().pipe(
            mergeMap((cardsGroups) => {
                return of(cardsGroups).pipe(
                    map(() => {
                        return selectedItemsObjectToArray(selectedItems);
                    }),
                    map((selectedCardsIDs) => deleteCards(
                        cardsGroups,
                        selectedCardsIDs
                    )),
                    tap((cardsGroups) => {
                        storageService.setBackup(cardsGroups);
                    })
                )
            })
        ))
    }
}
