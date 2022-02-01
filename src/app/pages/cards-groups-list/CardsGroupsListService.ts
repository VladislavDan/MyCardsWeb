import {map, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {ICard} from '../../types/ICard';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {Channel} from '../../common/Channel';
import {updateRepeatingDate} from './logic/updateRepeatingDate';


export class CardsGroupsListService {
    public groupsListChannel: Channel<string, ICardsGroup[]>;
    public groupDeleteChannel: Channel<number, ICardsGroup[]>;
    public resetProgressChannel: Channel<number, ICardsGroup[]>;


    constructor(storageService: StorageService) {
        this.groupsListChannel = new Channel(() => storageService.getBackup().pipe(
            map(updateRepeatingDate()),
            map((cardsGroups: ICardsGroup[]) => {
                return cardsGroups.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
                    if(firstCardGroup.repeatingDate && secondCardsGroup.repeatingDate) {
                        return secondCardsGroup.repeatingDate - firstCardGroup.repeatingDate;
                    } else {
                        return 0;
                    }
                })
            }),
            map((cardsGroups: ICardsGroup[]) => {
                cardsGroups.map((cardsGroup: ICardsGroup) => {
                    let statusDone = 0;
                    cardsGroup.cards.forEach((card: ICard) => {
                        if(card.rangeOfKnowledge === IRangeOfKnowledge.DONE) {
                            statusDone++
                        }
                    });
                    cardsGroup.percentRepeatedCards = statusDone/cardsGroup.cards.length*100;
                    return cardsGroup;
                });
                return cardsGroups;
            })
        ));

        this.groupDeleteChannel = new Channel((groupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {
                return cardsGroups.filter((cardGroup) => {
                    return cardGroup.id !== groupID;
                });
            }),
            tap((cardsGroups: ICardsGroup[]) => storageService.setBackup(cardsGroups))
        ));

        this.resetProgressChannel = new Channel((cardsGroupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {

                const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);

                if (cardGroupIndex < 0) {
                    return cardsGroups;
                }

                cardsGroups[cardGroupIndex].cards = cardsGroups[cardGroupIndex].cards.map((card: ICard) => {
                    return {
                        ...card,
                        rangeOfKnowledge: IRangeOfKnowledge.TO_DO
                    }
                });

                return cardsGroups;
            }),
            tap((cardsGroups: ICardsGroup[]) => storageService.setBackup(cardsGroups))
        ))
    }
}
