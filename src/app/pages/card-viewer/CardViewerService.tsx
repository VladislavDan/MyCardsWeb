import {map, switchMap} from 'rxjs/operators';

import {ICard} from '../../types/ICard';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {IRepeatingArgs} from '../../types/IRepeatingArgs';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {changeRangeOfKnowledge} from '../../common/logic/changeRangeOfKnowledge';
import {getCardForViewing} from "./logic/getCardForViewing";

export class CardViewerService {
    public cardChannel: Channel<number, ICard | undefined>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;

    constructor(private storageService: StorageService) {
        this.cardChannel = new Channel((cardID = -1) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardForViewing(cardsGroups, cardID))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.storageService.getBackup().pipe(
                map((cardsGroups: ICardsGroup[]) => changeRangeOfKnowledge(args, cardsGroups)),
                switchMap((cardsGroups: ICardsGroup[]) => this.storageService.setBackup(cardsGroups))
            );
        });
    }
}
