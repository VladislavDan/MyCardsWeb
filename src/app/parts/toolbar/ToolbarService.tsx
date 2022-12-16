import {of, switchMap} from 'rxjs';

import {Channel} from '../../../MyTools/channel-conception/Channel';
import {getPageLabel} from './logic/getPageLabel';
import {map} from 'rxjs/operators';
import {Routs} from '../../common/Routs';
import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {getCardsCount} from './logic/getCardsCount';
import {getGroupName} from './logic/getGroupName';

export class ToolbarService {

    public pageLabelChannel: Channel<{ path: string, cardsGroupsId: number }, string>;

    public cardsCountInGroupChannel: Channel<{ path: string, cardsGroupsId: number }, number>;

    constructor(storageService: StorageService) {
        this.cardsCountInGroupChannel = new Channel(
            ({path: string, cardsGroupsId}) => of({path: string, cardsGroupsId}).pipe(
                switchMap(({path, cardsGroupsId}) => {
                    const isShowingCardsCount = path === Routs.cards.path || path === Routs.cardsRepeater.path
                    if (isShowingCardsCount) {
                        return storageService.getBackup().pipe(
                            map((backup: ICardsGroup[]) => getCardsCount(backup, cardsGroupsId))
                        );
                    } else {
                        return of(-1);
                    }
                })
            )
        )

        this.pageLabelChannel = new Channel(
            ({path, cardsGroupsId}) => {
                return of({path, cardsGroupsId}).pipe(
                    switchMap(({path, cardsGroupsId}) => {
                            const isShowingGroupName = path === Routs.cards.path || path === Routs.cardsRepeater.path || path === Routs.cardViewer.path
                            if (isShowingGroupName) {
                                return storageService.getBackup().pipe(
                                    map((backup: ICardsGroup[]) => getGroupName(backup, cardsGroupsId))
                                );
                            }
                            return of(getPageLabel(path))
                        }
                    )
                )
            }
        )
    }
}
