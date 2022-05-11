import {map, tap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {getCardsByGroup} from './logic/getCardsByGroup';
import {resetCardProgress} from './logic/resetCardProgress';
import {deleteCard} from './logic/deleteCard';
import {filterCards} from "./logic/filterCards";
import {IFilter} from "../../types/IFilter";

export class CardsListService {
    public cardsChannel: Channel<{cardsGroupID: number, filter: IFilter}, ICard[]>;
    public resetCardProgressChannel: Channel<{cardID: number, cardsGroupID: number}, ICardsGroup[]>;
    public deleteCardChannel: Channel<{cardID: number, cardsGroupID: number}, ICardsGroup[]>;

    constructor(private storageService: StorageService) {
        this.cardsChannel = new Channel(({ cardsGroupID, filter}) => this.storageService.getBackup().pipe(
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
    }
}
