import {map, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {saveCardsGroup} from './logic/saveCardsGroup';
import {getEditingCardsGroup} from './logic/getEditingCardsGroup';

export class CardsGroupsEditorService {

    public groupEditingChannel: Channel<ICardsGroup, ICardsGroup[]>;
    public groupChannel: Channel<number, ICardsGroup>;

    constructor(storageService: StorageService) {
        this.groupEditingChannel = new Channel((editedCardGroup: ICardsGroup) => storageService.getBackup().pipe(
            map(saveCardsGroup(editedCardGroup)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            })
        ));

        this.groupChannel = new Channel((cardGroupID: number) => storageService.getBackup().pipe(
            map(getEditingCardsGroup(cardGroupID))
        ))
    }
}
