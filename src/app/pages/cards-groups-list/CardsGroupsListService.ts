import {Subject, throwError, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {localStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {ICard} from '../../types/ICard';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {Channel} from '../../common/Channel';

class CardsGroupsListService {
    public groupsListChannel: Channel<string, ICardsGroup[]>;


    constructor() {
        this.groupsListChannel = new Channel(() => of('').pipe(
            switchMap(() => {
                return localStorageService.getBackupFromStorage();
            }),
            map((cardsGroups: ICardsGroup[]) => {
                cardsGroups.map((cardsGroup: ICardsGroup) => {
                    let dateRepeating = 0;
                    cardsGroup.cards.forEach((card: ICard) => {
                        if(card.dateRepeating > dateRepeating) {
                            dateRepeating = card.dateRepeating
                        }
                    });
                    cardsGroup.dateRepeating = dateRepeating;
                    return cardsGroup;
                });
                return cardsGroups;
            }),
            map((cardsGroups: ICardsGroup[]) => {
                return cardsGroups.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
                    if(firstCardGroup.dateRepeating && secondCardsGroup.dateRepeating) {
                        return secondCardsGroup.dateRepeating - firstCardGroup.dateRepeating;
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
    }
}

export const cardsGroupsListManager = new CardsGroupsListService();
