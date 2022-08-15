import {of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {ICard} from '../../common/types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {IRepeatingArgs} from '../../common/types/IRepeatingArgs';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {IRepeatingProgress} from '../../common/types/IRepeatingProgress';
import {ISettings} from '../../common/types/ISettings';
import {getCardsByIDs} from './logic/getCardsByIDs';
import {changeRangeOfKnowledge} from '../../common/logic/changeRangeOfKnowledge';
import {getCardForRepeating} from './logic/getCardForRepeating';
import {getRepeatingProgress} from './logic/getRepeatingProgress';
import {shuffleCards} from './logic/shuffleCards';
import {refreshCardRepeatingDate} from "../../common/logic/refreshCardRepeatingDate";
import {deleteSingleCard} from "../../common/logic/deleteSingleCard";
import {getCardGroupName} from "../card-viewer/logic/getCardGroupName";

export class CardsRepeaterService {
    public cardChannel: Channel<number[], ICard>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public repeatingProgressChannel: Channel<string, IRepeatingProgress>;
    public deleteSingleCardChannel: Channel<number, ICardsGroup[]>;
    public cardGroupNameChannel: Channel<number, string>;

    private statisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    constructor(private storageService: StorageService) {
        this.cardChannel = new Channel((cardsIDs) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardsByIDs(cardsGroups, cardsIDs)),
            switchMap((cards: ICard[]) => this.storageService.getSettings().pipe(
                map((settings: ISettings) => {
                    if (settings.isRandomRepeating) {
                        cards = shuffleCards(cards);
                    }
                    return {
                        cards,
                        isRandomRepeating: settings.isRandomRepeating
                    };
                })
            )),
            tap(({cards, isRandomRepeating}) => {
                this.statisticValue = getRepeatingProgress(cards);
            }),
            map(({cards, isRandomRepeating}) => {
                return getCardForRepeating(cards, isRandomRepeating)
            })
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.storageService.getBackup().pipe(
                map((cardsGroups: ICardsGroup[]) => changeRangeOfKnowledge(args, cardsGroups)),
                map((cardsGroups: ICardsGroup[]) => refreshCardRepeatingDate(args, cardsGroups)),
                switchMap((cardsGroups: ICardsGroup[]) => this.storageService.setBackup(cardsGroups))
            );
        });

        this.repeatingProgressChannel = new Channel(() => of(this.statisticValue));

        this.deleteSingleCardChannel = new Channel(
            (cardID) => storageService.getBackup().pipe(
                map((cardsGroups: ICardsGroup[]) => deleteSingleCard(cardID, cardsGroups)),
                tap((cardsGroups: ICardsGroup[]) => {
                    storageService.setBackup(cardsGroups);
                }))
        );
        this.cardGroupNameChannel = new Channel<number, string>(
            (cardID) => storageService.getBackup().pipe(
                map((cardsGroups: ICardsGroup[]) => {
                    return getCardGroupName(cardsGroups, cardID);
                })
            )
        )
    }
}
