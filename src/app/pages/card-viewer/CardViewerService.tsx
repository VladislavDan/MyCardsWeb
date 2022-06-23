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

export class CardViewerService {
    public cardChannel: Channel<number, ICard>;
    public repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    public deleteSingleCardChannel: Channel<number, ICardsGroup[]>;

    constructor(private storageService: StorageService) {
        this.cardChannel = new Channel((cardID = -1) => this.storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => getCardForViewing(cardsGroups, cardID))
        ));

        this.repeatingResultChannel = new Channel((args: IRepeatingArgs) => {
            return this.storageService.getBackup().pipe(
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
    }
}
