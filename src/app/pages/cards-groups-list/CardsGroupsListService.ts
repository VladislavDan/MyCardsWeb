import {map, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {updateRepeatingDate} from './logic/updateRepeatingDate';
import {sortByRepeatingDate} from './logic/sortByRepeatingDate';
import {countRepeatedCardsPercent} from './logic/countRepeatedCardsPercent';
import {deleteGroup} from './logic/deleteGroup';
import {resetRepeatingProgress} from './logic/resetRepeatingProgress';

export class CardsGroupsListService {
    public groupsListChannel: Channel<string, ICardsGroup[]>;
    public groupDeleteChannel: Channel<number, ICardsGroup[]>;
    public resetProgressChannel: Channel<number, ICardsGroup[]>;


    constructor(storageService: StorageService) {
        this.groupsListChannel = new Channel(() => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => updateRepeatingDate(cardsGroups)),
            map((cardsGroups: ICardsGroup[]) => sortByRepeatingDate(cardsGroups)),
            map((cardsGroups: ICardsGroup[]) => countRepeatedCardsPercent(cardsGroups))
        ));

        this.groupDeleteChannel = new Channel((groupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => deleteGroup(groupID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => storageService.setBackup(cardsGroups))
        ));

        this.resetProgressChannel = new Channel((cardsGroupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => resetRepeatingProgress(cardsGroupID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => storageService.setBackup(cardsGroups))
        ))
    }
}
