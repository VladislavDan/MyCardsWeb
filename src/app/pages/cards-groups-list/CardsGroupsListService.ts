import {Subject, throwError, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {localStorageService} from '../../common/services/LocalStoragService';
import {CardsGroup} from '../../types/CardsGroup';
import {ICard} from '../../types/ICard';
import {RangeOfKnowledge} from '../../types/RangeOfKnowledge';
import {Channel} from '../../common/Channel';

class CardsGroupsListService {
    public groupsListChannel: Channel<string, CardsGroup[]>;


    constructor() {
        this.groupsListChannel = new Channel(() => of('').pipe(
            switchMap(() => {
                return localStorageService.getBackupFromStorage();
            }),
            map((cardsGroups: CardsGroup[]) => {
                cardsGroups.map((cardsGroup: CardsGroup) => {
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
                    cardsGroup.cards.forEach((card: ICard) => {
                        if(card.rangeOfKnowledge === RangeOfKnowledge.DONE) {
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
