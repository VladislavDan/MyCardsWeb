import {map, mergeMap, switchMap, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {updateRepeatingDate} from './logic/updateRepeatingDate';
import {sortByFilter} from './logic/sortByFilter';
import {countRepeatedCardsPercent} from './logic/countRepeatedCardsPercent';
import {deleteGroup} from './logic/deleteGroup';
import {resetRepeatingProgress} from './logic/resetRepeatingProgress';
import {defer, of} from "rxjs";
import {ISettings} from "../../common/types/ISettings";
import {updateObsoleteStatus} from "./logic/updateObsoleteStatus";
import {IFilter} from "../../common/types/IFilter";
import {IStoredFilters} from "../../common/types/IStoredFilters";

export class CardsGroupsListService {
    public groupsListChannel: Channel<string, ICardsGroup[]>;
    public groupDeleteChannel: Channel<number, ICardsGroup[]>;
    public resetProgressChannel: Channel<number, ICardsGroup[]>;
    public changeFilterChannel: Channel<IFilter, IStoredFilters>;
    public filterChannel: Channel<string, IFilter>;

    constructor(storageService: StorageService) {

        this.groupsListChannel = new Channel(() => storageService.getBackup().pipe(
            switchMap((backup) => {
                return storageService.getSettings().pipe(
                    switchMap((settings: ISettings) => {
                        return defer(() => {
                            return settings.autoObsolete && settings.autoObsolete.isEnable ?
                                of(
                                    updateObsoleteStatus(
                                        backup,
                                        settings.autoObsolete.timeInProgress,
                                        settings.autoObsolete.timeInDone
                                    )
                                ).pipe(tap((cardsGroups) => storageService.setBackup(cardsGroups))) :
                                of(backup)
                        })
                    })
                )
            }),
            map((cardsGroups: ICardsGroup[]) => updateRepeatingDate(cardsGroups)),
            map((cardsGroups: ICardsGroup[]) => countRepeatedCardsPercent(cardsGroups)),
            mergeMap((cardsGroups: ICardsGroup[]) => {
                return storageService.getFilter().pipe(
                    map((storedFilter) => sortByFilter(cardsGroups, storedFilter.cardsGroups))
                )
            })
        ));

        this.groupDeleteChannel = new Channel((groupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => deleteGroup(groupID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => storageService.setBackup(cardsGroups))
        ));

        this.resetProgressChannel = new Channel((cardsGroupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => resetRepeatingProgress(cardsGroupID, cardsGroups)),
            tap((cardsGroups: ICardsGroup[]) => storageService.setBackup(cardsGroups))
        ))

        this.filterChannel = new Channel<string, IFilter>(
            () => storageService.getFilter().pipe(
                map((storedFilters) => storedFilters.cardsGroups)
            )
        )

        this.changeFilterChannel = new Channel<IFilter, IStoredFilters>(
            (filter) => storageService.getFilter().pipe(
                map((storedFilters) => {
                        return {...storedFilters, cardsGroups: filter}
                    }
                ),
                tap((storedFilters) => {
                    storageService.setFilter(storedFilters);
                })
            )
        )
    }
}
