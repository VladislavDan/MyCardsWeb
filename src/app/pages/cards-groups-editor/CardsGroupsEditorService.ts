import {map, tap} from 'rxjs/operators';

import {LocalStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';

export class CardsGroupsEditorService {

    public groupEditingChannel: Channel<ICardsGroup, ICardsGroup[]>;
    public groupChannel: Channel<number, ICardsGroup>;

    constructor(localStorageService: LocalStorageService) {
        this.groupEditingChannel = new Channel((editedCardGroup: ICardsGroup) => localStorageService.getBackupFromStorage().pipe(
            map((cardsGroups: ICardsGroup[]) => {
                const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => editedCardGroup.id === cardGroup.id);

                if(cardGroupIndex < 0) {
                    cardsGroups.push(editedCardGroup);
                } else {
                    cardsGroups[cardGroupIndex] = editedCardGroup;
                }

                return cardsGroups;
            }),
            tap((cardsGroups: ICardsGroup[]) => {
                localStorageService.setBackupToStorage(cardsGroups);
            })
        ));

        this.groupChannel = new Channel((cardGroupID: number) => localStorageService.getBackupFromStorage().pipe(
            map((cardsGroups: ICardsGroup[]) => {

                let cardsGroup = cardsGroups.find((cardGroup: ICardsGroup) => cardGroupID === cardGroup.id);

                if(!cardsGroup) {
                    cardsGroup = {
                        cards: [],
                        nameCardsGroup: '',
                        dateRepeating: new Date().getTime(),
                        id: new Date().getTime(),
                        percentRepeatedCards: 0
                    }
                }
                return cardsGroup;
            })
        ))
    }
}
