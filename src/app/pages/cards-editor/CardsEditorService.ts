import {map, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {ICard} from '../../types/ICard';
import {ISimplifiedCardsGroup} from '../../types/ISimplifiedCardsGroup';
import {saveCard} from './logic/saveCard';
import {getEditingCard} from './logic/getEditingCard';
import {getSimplifiedGroup} from './logic/getSimplifiedGroup';
import {addCurrentGroupToSimplifiedGroup} from './logic/addCurrentGroupToSimplifiedGroup';

export class CardsEditorService {

    public cardEditingChannel: Channel<{ card: ICard, cardsGroupID: number }, ICard>;
    public simplifiedCardsGroupsChannel: Channel<number, {currentCardsGroup: ISimplifiedCardsGroup | undefined, cardsGroups: ISimplifiedCardsGroup[]}>;
    public cardChannel: Channel<{ cardID: number, cardsGroupID: number }, ICard | undefined>;

    constructor(storageService: StorageService) {
        this.cardEditingChannel = new Channel(({card, cardsGroupID}) => storageService.getBackup().pipe(
            map(saveCard(cardsGroupID, card)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            }),
            map(() => card)
        ));

        this.cardChannel = new Channel(({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map(getEditingCard(cardsGroupID, cardID))
        ));

        this.simplifiedCardsGroupsChannel = new Channel((cardsGroupID: number) => storageService.getBackup().pipe(
            map(getSimplifiedGroup()),
            map(addCurrentGroupToSimplifiedGroup(cardsGroupID))
        ))
    }
}
