import {of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {ICard} from '../../common/types/ICard';
import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {IRepeatingArgs} from '../../common/types/IRepeatingArgs';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {IRepeatingProgress} from '../../common/types/IRepeatingProgress';
import {getCardsByIDs} from './logic/getCardsByIDs';
import {changeRangeOfKnowledge} from '../../common/logic/changeRangeOfKnowledge';
import {getCardForRepeating} from './logic/getCardForRepeating';
import {getRepeatingProgress} from './logic/getRepeatingProgress';
import {refreshCardRepeatingDate} from '../../common/logic/refreshCardRepeatingDate';
import {deleteSingleCard} from '../../common/logic/deleteSingleCard';
import {getCardGroupName} from '../card-viewer/logic/getCardGroupName';
import {updateStatistic} from '../../common/logic/updateStatistic';
import {IStatistic} from '../../common/types/IStatistic';
import {IEmpty} from '../../../MyTools/channel-conception/defaults/IEmpty';
import {readByVoiceEngine} from '../../common/logic/readByVoiceEngine';
import {getVoiceService} from 'src/app/common/services/voice-service/getVoiceService';

export class CardsRepeaterService {
    public cardChannel: Channel<number[], ICard>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public repeatingProgressChannel: Channel<IEmpty, IRepeatingProgress>;
    public deleteSingleCardChannel: Channel<number, ICardsGroup[]>;
    public cardGroupNameChannel: Channel<number, string>;
    public readByVoiceEngineChannel: Channel<string, string>;

    private statisticValue = {
        inProgress: 0,
        todo: 0,
        done: 0
    };

    constructor(private storageService: getStorageService, private voiceService: getVoiceService) {
        this.cardChannel = new Channel((cardsIDs) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardsByIDs(cardsGroups, cardsIDs)),
            tap((cards) => {
                this.statisticValue = getRepeatingProgress(cards);
            }),
            switchMap((cards: ICard[]) => this.storageService.getSettings().pipe(
                map((settings) => {
                    return getCardForRepeating(cards, settings.repeatingType);
                })
            ))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.storageService.getStatistic().pipe(
                map((statistic: IStatistic) => updateStatistic(statistic, args)),
                map((statistic: IStatistic) => this.storageService.setStatistic(statistic)),
                switchMap(() => this.storageService.getBackup()),
                map((cardsGroups: ICardsGroup[]) => changeRangeOfKnowledge(args, cardsGroups)),
                map((cardsGroups: ICardsGroup[]) => refreshCardRepeatingDate(args, cardsGroups)),
                switchMap((cardsGroups: ICardsGroup[]) => this.storageService.setBackup(cardsGroups)),
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
        );
        this.readByVoiceEngineChannel = new Channel<string, string>(
            (text) => of(text).pipe(
                map(
                    (text) => readByVoiceEngine(text, voiceService.getRandomVoice())
                )
            )
        );
    }
}
