import {map, switchMap, tap} from 'rxjs/operators';

import {ICard} from '../../common/types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {IRepeatingArgs} from '../../common/types/IRepeatingArgs';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {changeRangeOfKnowledge} from '../../common/logic/changeRangeOfKnowledge';
import {getCardForViewing} from "./logic/getCardForViewing";
import {refreshCardRepeatingDate} from "../../common/logic/refreshCardRepeatingDate";
import {deleteSingleCard} from "../../common/logic/deleteSingleCard";
import {getCardGroupName} from "./logic/getCardGroupName";
import {IStatistic} from "../../common/types/IStatistic";
import {updateStatistic} from "../../common/logic/updateStatistic";
import {readByVoiceEngine} from "../../common/logic/readByVoiceEngine";
import {of} from "rxjs";
import {VoiceService} from "../../common/services/VoiceService";

export class CardViewerService {
    public cardChannel: Channel<number, ICard>;
    public cardGroupNameChannel: Channel<number, string>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public deleteSingleCardChannel: Channel<number, ICardsGroup[]>;
    public readByVoiceEngineChannel: Channel<string, string>;

    constructor(private storageService: StorageService, private voiceService: VoiceService) {
        this.cardChannel = new Channel((cardID = -1) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardForViewing(cardsGroups, cardID))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.storageService.getStatistic().pipe(
                map((statistic: IStatistic) => updateStatistic(statistic, args)),
                map((statistic: IStatistic) => this.storageService.setStatistic(statistic)),
                switchMap(() => this.storageService.getBackup()),
                map((cardsGroups: ICardsGroup[]) => changeRangeOfKnowledge(args, cardsGroups)),
                map((cardsGroups: ICardsGroup[]) => refreshCardRepeatingDate(args, cardsGroups)),
                switchMap((cardsGroups: ICardsGroup[]) => this.storageService.setBackup(cardsGroups))
            );
        });
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
        this.readByVoiceEngineChannel = new Channel<string, string>(
            (text) => of(text).pipe(
                map(
                    (text) => readByVoiceEngine(text, voiceService.getRandomVoice())
                )
            )
        );
    }
}
