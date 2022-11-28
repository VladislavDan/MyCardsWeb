import {map, switchMap, tap} from 'rxjs/operators';

import {ICard} from 'src/app/common/types/ICard';
import {ICardsGroup} from 'src/app/common/types/ICardsGroup';
import {IRepeatingArgs} from 'src/app/common/types/IRepeatingArgs';
import {Channel} from 'src/MyTools/channel-conception/Channel';
import {changeRangeOfKnowledge} from 'src/app/common/logic/changeRangeOfKnowledge';
import {getCardForViewing} from 'src/app/pages/card-viewer/logic/getCardForViewing';
import {refreshCardRepeatingDate} from 'src/app/common/logic/refreshCardRepeatingDate';
import {deleteSingleCard} from 'src/app/common/logic/deleteSingleCard';
import {getCardGroupName} from 'src/app/pages/card-viewer/logic/getCardGroupName';
import {IStatistic} from 'src/app/common/types/IStatistic';
import {updateStatistic} from 'src/app/common/logic/updateStatistic';
import {readByVoiceEngine} from 'src/app/common/logic/readByVoiceEngine';
import {of} from 'rxjs';
import {IDependencyFunction} from 'src/MyTools/react-di/types/IDependencyFunction';
import {IStorageService} from 'src/app/common/services/storage-service/types/IStorageService';
import {ICardViewerService} from 'src/app/pages/card-viewer/services/card-viewer-service/types/ICardViewerService';
import {IVoiceService} from 'src/app/common/services/voice-service/types/IVoiceService';

export const getCardViewerService: IDependencyFunction<ICardViewerService> = (
    storageService: IStorageService,
    voiceService: IVoiceService
) => {
    const cardChannel = new Channel<number, ICard>((cardID = -1) => storageService.getBackup().pipe(
        map((cardsGroups: ICardsGroup[]) => getCardForViewing(cardsGroups, cardID))
    ));

    const repeatingResultChannel = new Channel<IRepeatingArgs, ICardsGroup[]>((args: IRepeatingArgs) => {
        return storageService.getStatistic().pipe(
            map((statistic: IStatistic) => updateStatistic(statistic, args)),
            map((statistic: IStatistic) => storageService.setStatistic(statistic)),
            switchMap(() => storageService.getBackup()),
            map((cardsGroups: ICardsGroup[]) => changeRangeOfKnowledge(args, cardsGroups)),
            map((cardsGroups: ICardsGroup[]) => refreshCardRepeatingDate(args, cardsGroups)),
            switchMap((cardsGroups: ICardsGroup[]) => storageService.setBackup(cardsGroups))
        );
    });
    const deleteSingleCardChannel = new Channel<number, ICardsGroup[]>(
        (cardID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => deleteSingleCard(cardID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            }))
    );
    const cardGroupNameChannel = new Channel<number, string>(
        (cardID) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {
                return getCardGroupName(cardsGroups, cardID);
            })
        )
    )
    const readByVoiceEngineChannel = new Channel<string, string>(
        (text) => of(text).pipe(
            map(
                (text) => readByVoiceEngine(text, voiceService.getRandomVoice())
            )
        )
    );
    return {
        dependencyId: getCardViewerService.name,
        cardChannel,
        repeatingResultChannel,
        cardGroupNameChannel,
        readByVoiceEngineChannel,
        deleteSingleCardChannel
    }
}
