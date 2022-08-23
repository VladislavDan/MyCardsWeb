import {Channel} from "../../../MyTools/channel-conception/Channel";
import {IEmpty} from "../../../MyTools/channel-conception/defaults/IEmpty";
import {IRepeater} from "../../common/types/IRepeater";
import {StorageService} from "../../common/services/StorageService";
import {map, switchMap, tap} from "rxjs/operators";
import {getRepeaterByID} from "./logic/getRepeaterByID";
import {getCardsIDsFromRepeater} from "./logic/getCardsIDsFromRepeater";
import {removeRepeater} from "./logic/removeRepeater";
import {updateRepeatersProgress} from "./logic/updateRepeatersProgress";
import {resetRepeatingProgress} from "./logic/resetRepeatingProgress";
import {ICardsGroup} from "../../common/types/ICardsGroup";

export class RepeaterListService {
    public repeaterListChannel: Channel<IEmpty, IRepeater[]>;
    public startRepeatingChannel: Channel<number, number[]>;
    public removingRepeaterChannel: Channel<number, IRepeater[]>;
    public resetProgressChannel: Channel<number, ICardsGroup[]>;

    constructor(storageService: StorageService) {
        this.repeaterListChannel = new Channel(
            () => storageService.getRepeaters().pipe(
                switchMap((repeaters) => {
                    return storageService.getBackup().pipe(
                        map((cardsGroups) => updateRepeatersProgress(cardsGroups, repeaters))
                    )
                })
            )
        )
        this.startRepeatingChannel = new Channel(
            (repeaterID) => storageService.getRepeaters().pipe(
                map((repeaters: IRepeater[]) => {
                    return getRepeaterByID(repeaters, repeaterID);
                }),
                switchMap((repeater: IRepeater) => storageService.getBackup().pipe(
                    map((cardsGroups) => {
                        return getCardsIDsFromRepeater(cardsGroups, repeater);
                    })
                ))
            )
        )
        this.removingRepeaterChannel = new Channel(
            (repeaterID) => storageService.getRepeaters().pipe(
                map((repeaters) => removeRepeater(repeaters, repeaterID)),
                tap((repeaters) => storageService.setRepeaters(repeaters))
            )
        )
        this.resetProgressChannel = new Channel(
            (repeaterID) => storageService.getRepeaters().pipe(
                map((repeaters: IRepeater[]) => {
                    return getRepeaterByID(repeaters, repeaterID);
                }),
                switchMap((repeater) => storageService.getBackup().pipe(
                    map((cardsGroups) => resetRepeatingProgress(cardsGroups, repeater)),
                    switchMap((cardsGroups) => storageService.setBackup(cardsGroups))
                ))
            )
        )
    }
}