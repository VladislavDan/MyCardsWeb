import {BaseManager} from '../base-screen/BaseManager'
import {Subject} from 'rxjs'
import {map} from 'rxjs/operators'
import {MMKV} from 'react-native-mmkv'
import {APP_STORAGE_KEY, RANGE_OF_KNOWLEDGE} from '../../common/Constants'
import {AppState} from '../../types/AppState'
import * as _ from 'lodash'
import {CardsStatus} from '../../types/screens/cards-screen/CardsStatus'
import {CardsState} from '../../types/screens/cards-screen/CardsState'
import {Card} from '../../types/screens/cards-screen/Card'

export class CardsRepeaterManager implements BaseManager {

    public repeatCardsChannel: Subject<number> = new Subject();
    public changeCardsStatusChannel: Subject<{card:Card, cardsGroupId: number}> = new Subject();
    public resetCardsChannel: Subject<number> = new Subject();
    public statusCardsChannel: Subject<CardsStatus> = new Subject();
    public errorChannel: Subject<any> = new Subject();

    constructor() {
        this.repeatCardsChannel.pipe(
            map((cardsGroupId: number) => {
                let result: AppState = JSON.parse(MMKV.getString(APP_STORAGE_KEY))

                return this.getCardsStatus(result.cards, cardsGroupId);
            })
        ).subscribe(
            (cardsStatus: CardsStatus) => {
                this.statusCardsChannel.next(cardsStatus)
            },
            (error) => {
                this.errorChannel.next(error)
            }
        );

        this.changeCardsStatusChannel.pipe(
            map(({card, cardsGroupId}) => {
                let result: AppState = JSON.parse(MMKV.getString(APP_STORAGE_KEY));

                result.cards.cardsCollection.forEach((item: Card, index: number) => {
                    if(item.answer === card.answer && item.question === item.question) {
                        result.cards.cardsCollection[index] = card;
                    }
                });
                MMKV.set(APP_STORAGE_KEY, JSON.stringify(result));
                console.log(card);
                return this.getCardsStatus(result.cards, cardsGroupId);
            })
        ).subscribe(
            (cardsStatus: CardsStatus) => {
                console.log(cardsStatus.notFamiliarCards);
                this.statusCardsChannel.next(cardsStatus)
            },
            (error) => {
                this.errorChannel.next(error)
            }
        );

        this.resetCardsChannel.pipe(
            map((cardsGroupId: number) => {
                let result: AppState = JSON.parse(MMKV.getString(APP_STORAGE_KEY));
                _.forEach(result.cards.cardsCollection, (card: Card) => {
                    if(_.findIndex(card.teamIds, (teamId) => teamId === cardsGroupId) >=0) {
                        card.rangeOfKnowledge = RANGE_OF_KNOWLEDGE.NOT_FAMILIAR_CARD;
                    }
                });
                MMKV.set(APP_STORAGE_KEY, JSON.stringify(result));
                return this.getCardsStatus(result.cards, cardsGroupId);
            })
        ).subscribe(
            (cardsStatus: CardsStatus) => {
                this.statusCardsChannel.next(cardsStatus)
            },
            (error) => {
                this.errorChannel.next(error)
            }
        );
    }

    getCardsStatus(cards: CardsState, cardsGroupId: number) {
        const filteredCards = _.filter(cards.cardsCollection, (card: Card) => {
            return _.findIndex(card.teamIds, (teamId) => teamId === cardsGroupId) >= 0 || cardsGroupId === -1
        })
        console.log(filteredCards)
        const moreFamiliarCards = _.filter(filteredCards,
            (card: Card) => card.rangeOfKnowledge === RANGE_OF_KNOWLEDGE.MORE_FAMILIAR_CARD
        )
        const lowFamiliarCards = _.filter(filteredCards,
            (card: Card) => card.rangeOfKnowledge === RANGE_OF_KNOWLEDGE.LOW_FAMILIAR_CARD
        )
        const notFamiliarCards = _.filter(filteredCards,
            (card: Card) => card.rangeOfKnowledge === RANGE_OF_KNOWLEDGE.NOT_FAMILIAR_CARD
        )
        let currentCard: Card = this.getRandomInt(0, 2) === 0
            ? notFamiliarCards[this.getRandomInt(0, notFamiliarCards.length)]
            : null
        if (!currentCard && lowFamiliarCards.length && lowFamiliarCards.length > 10) {
            currentCard = lowFamiliarCards[this.getRandomInt(0, lowFamiliarCards.length)]
        }
        if (!currentCard && notFamiliarCards.length) {
            currentCard = notFamiliarCards[this.getRandomInt(0, notFamiliarCards.length)]
        }
        if (!currentCard && !notFamiliarCards.length && lowFamiliarCards.length) {
            currentCard = lowFamiliarCards[this.getRandomInt(0, lowFamiliarCards.length)]
        }

        return {
            moreFamiliarCards,
            lowFamiliarCards,
            notFamiliarCards,
            currentCard
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    destroy(): void {
        this.repeatCardsChannel.unsubscribe();
        this.statusCardsChannel.unsubscribe();
        this.errorChannel.unsubscribe();
        this.changeCardsStatusChannel.unsubscribe();
        this.resetCardsChannel.unsubscribe();
    }
}
