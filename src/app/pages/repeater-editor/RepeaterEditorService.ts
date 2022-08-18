import {Channel} from "../../../MyTools/channel-conception/Channel";
import {IEmpty} from "../../../MyTools/channel-conception/defaults/IEmpty";
import {ICardsGroup} from "../../common/types/ICardsGroup";
import {StorageService} from "../../common/services/StorageService";

export class RepeaterEditorService {
    public groupsListChannel: Channel<IEmpty, ICardsGroup[]>;

    constructor(private storageService: StorageService) {
        this.groupsListChannel = new Channel(() => storageService.getBackup());
    }
}