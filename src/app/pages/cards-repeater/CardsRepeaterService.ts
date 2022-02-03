import {of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {Channel} from '../../common/Channel';
import {IStatistic} from '../../types/IStatistic';
import {ISettings} from '../../types/ISettings';
import {getCards} from './logic/getCards';
import {changeRangeOfKnowledge} from './logic/changeRangeOfKnowledge';
import {getCardForRepeating} from './logic/getCardForRepeating';
import {updateStatistic} from './logic/updateStatistic';
import {shuffleCards} from './logic/shuffleCards';
import {getFirstCard} from './logic/getFirstCard';

export class CardsRepeaterService {
    public currentCardChannel: Channel<number | null, ICard | null>;
    public cardChannel: Channel<{ cardsGroupID: number | null, cardID: number | null }, ICard | undefined>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public statisticChannel: Channel<string, IStatistic>;

    private statisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    constructor(private storageService: StorageService) {
        this.cardChannel = new Channel(({cardsGroupID = null, cardID = null}) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCards(cardsGroups, cardsGroupID, cardID)),
            switchMap((cards: ICard[]) => this.storageService.getSettings().pipe(
                map((settings: ISettings) => {
                    if (settings.isRandomRepeating) {
                        cards = shuffleCards(cards);
                    }
                    return cards;
                })
            )),
            tap((cards: ICard[]) => {
                updateStatistic(cards, this.statisticValue);
            }),
            map((cards: ICard[]) => getCardForRepeating(cards))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.storageService.getBackup().pipe(
                map((cardsGroups: ICardsGroup[]) => changeRangeOfKnowledge(args, cardsGroups)),
                switchMap((cardsGroups: ICardsGroup[]) => this.storageService.setBackup(cardsGroups))
            );
        });

        this.currentCardChannel = new Channel((cardsGroupID = null) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCards(cardsGroups, cardsGroupID)),
            map((cardsGroups: ICard[]) => getFirstCard(cardsGroups))
        ));

        this.statisticChannel = new Channel(() => of(this.statisticValue));
    }
}
