import {BaseManager} from '../base-screen/BaseManager'
import {Subject} from 'rxjs'
import {CardsGroup} from '../../types/screens/cards-screen/CardsGroup'
import {Card} from '../../types/screens/cards-screen/Card'
import {map, switchMap} from 'rxjs/operators'
import * as _ from 'lodash'
import {MMKV} from 'react-native-mmkv'
import {APP_STORAGE_KEY} from '../../common/Constants'
import {AppState} from '../../types/AppState'

export class CardsGroupsManager implements BaseManager {

    public initializeCardsGroupsChannel: Subject<void> = new Subject();
    public cardsChannel: Subject<{cardsGroups: CardsGroup[], cards: Card[]}> = new Subject();
    public errorChannel: Subject<any> = new Subject();

    constructor() {
        this.initializeCardsGroupsChannel.pipe(
            map(() => {return JSON.parse(MMKV.getString(APP_STORAGE_KEY))}),
            map((result: AppState) => {
                const cards = result.cards.cardsCollection;
                _.forEach(result.cardsGroups, (cardsGroup: CardsGroup) => {
                    const cardsForCurrentGroup: Card[] = _.filter(cards, (card: Card) => {
                        return _.findIndex(card.teamIds, (teamId) => teamId === cardsGroup.dateCreating) >= 0;
                    });
                    const card: Card = _.maxBy(cardsForCurrentGroup, (card: Card) => {
                        return card.dateRepeating;
                    });
                    if (card && card.dateRepeating) {
                        cardsGroup.dateRepeating = card.dateRepeating;
                    }
                });
                const cardsGroups: CardsGroup[] = _.sortBy(result.cardsGroups, [(cardGroup: CardsGroup) => {
                    return cardGroup.dateRepeating;
                }]);
                return {cardsGroups, cards}
            })
        ).subscribe(
            ({cardsGroups, cards}) => {
                this.cardsChannel.next({cardsGroups, cards});
            },
            (error) => {
                this.errorChannel.next(error)
            }
        )
    }

    destroy(): void {
      this.initializeCardsGroupsChannel.unsubscribe();
      this.cardsChannel.unsubscribe();
      this.errorChannel.unsubscribe();
    }
}
