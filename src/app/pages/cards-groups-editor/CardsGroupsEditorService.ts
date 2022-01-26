import {map, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';

export class CardsGroupsEditorService {

    public groupEditingChannel: Channel<ICardsGroup, ICardsGroup[]>;
    public groupChannel: Channel<number, ICardsGroup>;

    constructor(storageService: StorageService) {
        this.groupEditingChannel = new Channel((editedCardGroup: ICardsGroup) => storageService.getBackup().pipe(
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
                storageService.setBackup(cardsGroups);
            })
        ));

        this.groupChannel = new Channel((cardGroupID: number) => storageService.getBackup().pipe(
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
