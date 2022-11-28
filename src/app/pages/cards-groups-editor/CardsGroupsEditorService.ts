import {map, tap} from 'rxjs/operators';

import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {saveCardsGroup} from './logic/saveCardsGroup';
import {getEditingCardsGroup} from './logic/getEditingCardsGroup';

export class CardsGroupsEditorService {

    public groupEditingChannel: Channel<ICardsGroup, ICardsGroup[]>;
    public groupChannel: Channel<number, ICardsGroup>;

    constructor(storageService: getStorageService) {
        this.groupEditingChannel = new Channel((editedCardGroup: ICardsGroup) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => saveCardsGroup(editedCardGroup, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            })
        ));

        this.groupChannel = new Channel((cardGroupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getEditingCardsGroup(cardGroupID, cardsGroups))
        ))
    }
}
