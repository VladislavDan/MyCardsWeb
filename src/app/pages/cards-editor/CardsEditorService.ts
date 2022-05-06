import {map, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../../../MyTools/channel-conception/Channel';
import {ICard} from '../../types/ICard';
import {ISimplifiedCardsGroup} from '../../types/ISimplifiedCardsGroup';
import {saveCard} from './logic/saveCard';
import {getEditingCard} from './logic/getEditingCard';
import {getSimplifiedGroup} from './logic/getSimplifiedGroup';
import {addCurrentGroupToSimplifiedGroup} from './logic/addCurrentGroupToSimplifiedGroup';

export class CardsEditorService {

    public cardEditingChannel: Channel<{ card: ICard, cardsGroupID: number }, ICard>;
    public simplifiedCardsGroupsChannel: Channel<number, { currentCardsGroup: ISimplifiedCardsGroup | undefined, cardsGroups: ISimplifiedCardsGroup[] }>;
    public cardChannel: Channel<{ cardID: number, cardsGroupID: number }, ICard | undefined>;

    constructor(storageService: StorageService) {
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

        this.simplifiedCardsGroupsChannel = new Channel((cardsGroupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getSimplifiedGroup(cardsGroups)),
            map((cardsGroups: ISimplifiedCardsGroup[]) => addCurrentGroupToSimplifiedGroup(cardsGroupID, cardsGroups))
        ))
    }
}
