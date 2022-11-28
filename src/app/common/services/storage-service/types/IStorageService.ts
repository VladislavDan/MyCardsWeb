import {Observable} from 'rxjs';
import {ICardsGroup} from 'src/app/common/types/ICardsGroup';
import {ISettings} from 'src/app/common/types/ISettings';
import {IStoredFilters} from 'src/app/common/types/IStoredFilters';
import {IStatistic} from 'src/app/common/types/IStatistic';
import {IRepeater} from 'src/app/common/types/IRepeater';
import {IDependency} from 'src/MyTools/react-di/types/IDependency';

export interface IStorageService extends IDependency {
    setSettings: (settings: ISettings) => Observable<ISettings>;
    getFilter: () => Observable<IStoredFilters>;
    getSettings: () => Observable<ISettings>;
    getStatistic: () => Observable<IStatistic>;
    setBackup: (cardsGroups: ICardsGroup[]) => Observable<ICardsGroup[]>;
    getAuthToken: () => Observable<string>;
    setAuthToken: (authToken: string) => Observable<string>;
    setRepeaters: (repeaters: IRepeater[]) => Observable<IRepeater[]>;
    getRepeaters: () => Observable<IRepeater[]>;
    setStatistic: (statistic: IStatistic) => Observable<IStatistic>;
    getBackup: () => Observable<ICardsGroup[]>;
    setFilter: (settings: IStoredFilters) => Observable<IStoredFilters>
}