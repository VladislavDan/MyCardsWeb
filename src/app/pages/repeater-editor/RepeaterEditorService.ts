import {map, switchMap} from "rxjs/operators";

import {Channel} from "../../../MyTools/channel-conception/Channel";
import {IEmpty} from "../../../MyTools/channel-conception/defaults/IEmpty";
import {ICardsGroup} from "../../common/types/ICardsGroup";
import {StorageService} from "../../common/services/StorageService";
import {IRepeater} from "../../common/types/IRepeater";
import {updateExistRepeater} from "./logic/updateExistRepeater";
import {of} from "rxjs";
import {updateGroupsIDs} from "./logic/updateGroupsIDs";
import {getRepeaterByID} from "./logic/getRepeaterByID";

export class RepeaterEditorService {
    public groupsListChannel: Channel<IEmpty, ICardsGroup[]>;
    public saveRepeaterChannel: Channel<IRepeater, IRepeater[]>;
    public updateGroupsIDsChannel: Channel<{ selectedGroups: { [key: number]: boolean }; repeater: IRepeater },
        IRepeater>;
    public repeaterChannel: Channel<number, IRepeater>;

    constructor(private storageService: StorageService) {
        this.groupsListChannel = new Channel(() => storageService.getBackup());

        this.saveRepeaterChannel = new Channel(
            (repeater) => storageService.getRepeaters().pipe(
                map((repeaters) => {
                    if (repeater.id === -1) {
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
    }
}