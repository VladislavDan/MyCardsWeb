import {Channel} from "../../../MyTools/channel-conception/Channel";
import {IStatistic} from "../../common/types/IStatistic";
import {StorageService} from "../../common/services/StorageService";
import {map} from "rxjs/operators";
import {getRowsFromStatistic} from "./logic/getRowsFromStatistic";
import {IRow} from "./types/IRow";
import {defaultStatistic} from "../../common/defaults/defaultStatistic";
import {IEmpty} from "../../../MyTools/channel-conception/defaults/IEmpty";

export class StatisticService {
    public statisticChannel: Channel<IEmpty, IRow[]>;
    public removeStatisticChannel: Channel<IEmpty, IStatistic>;

    constructor(private storageService: StorageService) {
        this.statisticChannel = new Channel(
            () => storageService.getStatistic().pipe(
                map((statistic: IStatistic) => {
                    return getRowsFromStatistic(statistic);
                })
            )
        )
        this.removeStatisticChannel = new Channel(
            () => storageService.setStatistic(defaultStatistic)
        )
    }
}
