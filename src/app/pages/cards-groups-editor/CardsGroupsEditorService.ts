import {of} from 'rxjs';

import {localStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {map, switchMap, tap} from 'rxjs/operators';

class CardsGroupsEditorService {

    public groupEditingChannel: Channel<ICardsGroup, ICardsGroup[]>;

    constructor() {
        this.groupEditingChannel = new Channel((editedCardGroup: ICardsGroup) => localStorageService.getBackupFromStorage().pipe(
            map((cardsGroups: ICardsGroup[]) => {
                const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => editedCardGroup.id === cardGroup.id);

                if(cardGroupIndex < 0) {
                    cardsGroups.push(editedCardGroup);
                } else {
                    cardsGroups[cardGroupIndex] = editedCardGroup;
                }

                return cardsGroups;
            })
        ))
    }
}

export const cardsGroupsEditorService= new CardsGroupsEditorService();
