import {map, switchMap} from 'rxjs/operators';

import {Channel} from '../../../MyTools/channel-conception/Channel';
import {IEmpty} from '../../../MyTools/channel-conception/defaults/IEmpty';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {IRepeater} from '../../common/types/IRepeater';
import {updateExistRepeater} from './logic/updateExistRepeater';
import {of} from 'rxjs';
import {updateGroupsIDs} from './logic/updateGroupsIDs';
import {getRepeaterByID} from './logic/getRepeaterByID';
import {getSelectedGroups} from './logic/getSelectedGroups';

export class RepeaterEditorService {
    public groupsListChannel: Channel<IEmpty, ICardsGroup[]>;
    public saveRepeaterChannel: Channel<IRepeater, IRepeater[]>;
    public updateGroupsIDsChannel: Channel<{ selectedGroups: { [key: number]: boolean }; repeater: IRepeater },
        IRepeater>;
    public repeaterChannel: Channel<number, IRepeater>;
    public selectedGroupsChannel: Channel<IRepeater, {
        [key: number]: boolean;
    }>;

    constructor(private storageService: getStorageService) {
        this.groupsListChannel = new Channel(
            () => storageService.getBackup()
        );

        this.saveRepeaterChannel = new Channel(
            (repeater) => storageService.getRepeaters().pipe(
                map((repeaters) => {
                    if (repeater.id === -1) {
                        repeater.id = new Date().getTime();
                        repeaters.push(repeater);
                    } else {
                        updateExistRepeater(repeaters, repeater);
                    }
                    return repeaters;
                }),
                switchMap((repeaters) => storageService.setRepeaters(repeaters))
            )
        )

        this.updateGroupsIDsChannel = new Channel(
            ({repeater, selectedGroups}) => of(repeater).pipe(
                map(() => updateGroupsIDs(selectedGroups, repeater))
            )
        )

        this.repeaterChannel = new Channel(
            (repeaterID) => storageService.getRepeaters().pipe(
                map((repeaters) => {
                    return getRepeaterByID(repeaters, repeaterID);
                })
            )
        )
        this.selectedGroupsChannel = new Channel(
            (repeater: IRepeater) => of(repeater).pipe(
                map(() => getSelectedGroups(repeater))
            )
        )
    }
}