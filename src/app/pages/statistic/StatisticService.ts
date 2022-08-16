import {Channel} from "../../../MyTools/channel-conception/Channel";
import {IStatistic} from "../../common/types/IStatistic";
import {StorageService} from "../../common/services/StorageService";
import {map} from "rxjs/operators";
import {getRowsFromStatistic} from "./logic/getRowsFromStatistic";
import {IRow} from "./types/IRow";
import {defaultStatisticValue} from "../../common/defaults/defaultStatisticValue";

export class StatisticService {
    public statisticChannel: Channel<string, IRow[]>;
    public removeStatisticChannel: Channel<string, IStatistic>;

    constructor(private storageService: StorageService) {
        this.statisticChannel = new Channel(
            () => storageService.getStatistic().pipe(
                map((statistic: IStatistic) => {
                    return getRowsFromStatistic(statistic);
                })
            )
        )
        this.removeStatisticChannel = new Channel(
            () => storageService.setStatistic(defaultStatisticValue)
        )
    }
}
