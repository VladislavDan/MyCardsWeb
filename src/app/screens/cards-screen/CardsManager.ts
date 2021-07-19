import {BaseManager} from '../base-screen/BaseManager'
import {Subject} from 'rxjs'
import {Card} from '../../types/screens/cards-screen/Card'
import {map} from 'rxjs/operators'
import * as _ from 'lodash'
import {MMKV} from 'react-native-mmkv'
import {APP_STORAGE_KEY} from '../../common/Constants'
import {AppState} from '../../types/AppState'

export class CardsManager implements BaseManager {

    public initializeCardsChannel: Subject<number> = new Subject();
    public cardsChannel: Subject<Card[]> = new Subject();
    public errorChannel: Subject<any> = new Subject();
    public sortWay;

    constructor() {
        this.sortWay = this.sortWay === 'date' ? 'title' : 'date';
        this.initializeCardsChannel.pipe(
            map((cardsGroupId: number) => {
                const result: AppState = JSON.parse(MMKV.getString(APP_STORAGE_KEY));
                const filteredCards = _.filter(result.cards.cardsCollection, (card: Card) => {
                    return _.findIndex(card.teamIds, (teamId) => teamId === cardsGroupId) >= 0 || cardsGroupId === -1;
                });
                return _.sortBy(filteredCards, [(card: Card) => {
                    return card.dateRepeating;
                }]);
            })
        ).subscribe(
            (cards) => {
                this.cardsChannel.next(cards);
            },
            (error) => {
                this.errorChannel.next(error)
            }
        )
    }

    destroy(): void {
        this.initializeCardsChannel.unsubscribe();
        this.cardsChannel.unsubscribe();
        this.errorChannel.unsubscribe();
    }
}
