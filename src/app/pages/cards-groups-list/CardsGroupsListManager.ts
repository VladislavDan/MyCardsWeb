import {Subject, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {localStorageManager} from '../../common/managers/LocalStoragManager';
import {CardsGroup} from '../../types/CardsGroup';
import {errorManager} from '../../elements/error-container/ErrorManager';
import {Card} from '../../types/Card';
import {RangeOfKnowledge} from '../../types/RangeOfKnowledge';

class CardsGroupsListManager {
    public groupsListChannel: Subject<any>;


    constructor() {
        this.groupsListChannel = new Subject<any>().pipe(
            switchMap(() => {
                return localStorageManager.getBackupFromStorage();
            }),
            map((cardsGroups: CardsGroup[]) => {
                cardsGroups.map((cardsGroup: CardsGroup) => {
                    let dateRepeating = 0;
                    cardsGroup.cards.forEach((card: Card) => {
                        if(card.dateRepeating > dateRepeating) {
                            dateRepeating = card.dateRepeating
                        }
                    });
                    cardsGroup.dateRepeating = dateRepeating;
                    return cardsGroup;
                });
                return cardsGroups;
            }),
            map((cardsGroups: CardsGroup[]) => {
                return cardsGroups.sort((firstCardGroup: CardsGroup, secondCardsGroup: CardsGroup) => {
                    if(firstCardGroup.dateRepeating && secondCardsGroup.dateRepeating) {
                        return secondCardsGroup.dateRepeating - firstCardGroup.dateRepeating;
                    } else {
                        return 0;
                    }
                })
            }),
            map((cardsGroups: CardsGroup[]) => {
                cardsGroups.map((cardsGroup: CardsGroup) => {
                    let statusDone = 0;
                    cardsGroup.cards.forEach((card: Card) => {
                        if(card.rangeOfKnowledge === RangeOfKnowledge.DONE) {
                            statusDone++
                        }
                    });
                    cardsGroup.percentRepeatedCards = statusDone/cardsGroup.cards.length*100;
                    return cardsGroup;
                });
                return cardsGroups;
            }),
            catchError((error: Error) => {
                errorManager.errorChannel.next('Cannot load files from local storage');
                return throwError(error);
            })
        ) as Subject<any>;
    }
}

export const cardsGroupsListManager = new CardsGroupsListManager();
