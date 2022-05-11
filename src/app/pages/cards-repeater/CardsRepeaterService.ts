import {of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {IStatistic} from '../../types/IStatistic';
import {ISettings} from '../../types/ISettings';
import {getCardsByGroupID} from './logic/getCardsByGroupID';
import {changeRangeOfKnowledge} from '../../common/logic/changeRangeOfKnowledge';
import {getCardForRepeating} from './logic/getCardForRepeating';
import {getStatistic} from './logic/getStatistic';
import {shuffleCards} from './logic/shuffleCards';
import {getFirstCard} from './logic/getFirstCard';

export class CardsRepeaterService {
    public currentCardChannel: Channel<number | null, ICard | null>;
    public cardChannel: Channel<number, ICard | undefined>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public statisticChannel: Channel<string, IStatistic>;

    private statisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    constructor(private storageService: StorageService) {
        this.cardChannel = new Channel((cardsGroupID = -1) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardsByGroupID(cardsGroups, cardsGroupID)),
            switchMap((cards: ICard[]) => this.storageService.getSettings().pipe(
                map((settings: ISettings) => {
                    if (settings.isRandomRepeating) {
                        cards = shuffleCards(cards);
                    }
                    return {
                        cards,
                        isRundomRepeating: settings.isRandomRepeating
                    };
                })
            )),
            tap(({cards, isRundomRepeating}) => {
                this.statisticValue = getStatistic(cards);
            }),
            map(({cards, isRundomRepeating}) => {
                return getCardForRepeating(cards, isRundomRepeating)
            })
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.storageService.getBackup().pipe(
                map((cardsGroups: ICardsGroup[]) => changeRangeOfKnowledge(args, cardsGroups)),
                switchMap((cardsGroups: ICardsGroup[]) => this.storageService.setBackup(cardsGroups))
            );
        });

        this.currentCardChannel = new Channel((cardsGroupID = null) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardsByGroupID(cardsGroups, cardsGroupID)),
            map((cardsGroups: ICard[]) => getFirstCard(cardsGroups))
        ));

        this.statisticChannel = new Channel(() => of(this.statisticValue));
    }
}
