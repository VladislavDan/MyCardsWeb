import {map, tap} from 'rxjs/operators';

import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {ICard} from '../../common/types/ICard';
import {saveCard} from './logic/saveCard';
import {getEditingCard} from './logic/getEditingCard';

export class CardsEditorService {

    public cardEditingChannel: Channel<{ card: ICard, cardsGroupID: number }, ICard>;
    public cardChannel: Channel<{ cardID: number, cardsGroupID: number }, ICard | undefined>;

    constructor(storageService: getStorageService) {
        this.cardEditingChannel = new Channel(({card, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => saveCard(cardsGroupID, card, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            }),
            map(() => card)
        ));

        this.cardChannel = new Channel(({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getEditingCard(cardsGroupID, cardID, cardsGroups))
        ));
    }
}