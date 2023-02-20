import {from, Observable} from 'rxjs';
import {ICardsGroup} from '../types/ICardsGroup';
import {DataBaseService} from './DataBaseService';
import {ISettings} from '../types/ISettings';
import {IStoredFilters} from '../types/IStoredFilters';
import {defaultFilter} from '../defaults/defaultFilter';
import {IStatistic} from '../types/IStatistic';
import {defaultStatistic} from '../defaults/defaultStatistic';
import {defaultSettings} from '../defaults/defaultSettings';
import {IRepeater} from '../types/IRepeater';

export class StorageService {

    private cardsStorageID = 'cards-local-storage';
    private authTokenLocalStorageID = 'auth-token';
    private settingsID = 'settings';
    private filterID = 'filter'
    private statisticID = 'statistic'
    private repeatersID = 'repeaters'

    constructor(private dataBaseService: DataBaseService) {
    }

    public getBackup = () : Observable<ICardsGroup[]> => {
        return from(this.getBackupFromDataBase());
    };

    private getBackupFromDataBase = async () => {
        let backup = null;

        try {
            backup = await this.dataBaseService.get<ICardsGroup[]>(this.cardsStorageID);
        } catch (e) {
            console.error(e);
            return backup;
        }
        if(backup) {
            return backup;
        } else {
            return [];
        }
    };

    public setBackup(cardsGroups: ICardsGroup[]): Observable<ICardsGroup[]> {
        return from(this.setBackupToDataBase(cardsGroups));
    }

    private setBackupToDataBase = async (cardsGroups: ICardsGroup[]) => {
        try {
            await this.dataBaseService.set(this.cardsStorageID, cardsGroups);
        } catch (e) {
            console.error(e);
        }
        return cardsGroups;
    };

    public getAuthToken(): Observable<string> {
        return from(new Promise<string>((resolve, reject) => {
            const authToken = localStorage.getItem(this.authTokenLocalStorageID);
            if(authToken) {
                resolve(authToken);
            } else {
                reject('Auth token is empty')
            }
        }));
    }

    public setAuthToken(authToken: string): Observable<string> {
        return from(new Promise<string>((resolve) => {
            localStorage.setItem(this.authTokenLocalStorageID, authToken);
            resolve(authToken);
        }));
    }

    public getSettings(): Observable<ISettings> {
        return from(new Promise<ISettings>((resolve, reject) => {
            const settings = localStorage.getItem(this.settingsID);
            if(settings) {
                resolve(JSON.parse(settings) as ISettings);
            } else {
                resolve(defaultSettings)
            }
        }));
    }

    public setSettings(settings: ISettings): Observable<ISettings> {
        return from(new Promise<ISettings>((resolve) => {
            localStorage.setItem(this.settingsID, JSON.stringify(settings));
            resolve(settings);
        }));
    }

    public getFilter(): Observable<IStoredFilters> {
        return from(new Promise<IStoredFilters>((resolve) => {
            const settings = localStorage.getItem(this.filterID);
            if (settings) {
                resolve(JSON.parse(settings) as IStoredFilters);
            } else {
                resolve({
                    cards: defaultFilter,
                    cardsGroups: defaultFilter
                })
            }
        }));
    }

    public setFilter(settings: IStoredFilters): Observable<IStoredFilters> {
        return from(new Promise<IStoredFilters>((resolve) => {
            localStorage.setItem(this.filterID, JSON.stringify(settings));
            resolve(settings);
        }));
    }

    public getStatistic(): Observable<IStatistic> {
        return from(new Promise<IStatistic>((resolve) => {
            const statistic = localStorage.getItem(this.statisticID);
            if (statistic) {
                resolve(JSON.parse(statistic) as IStatistic);
            } else {
                resolve(defaultStatistic)
            }
        }));
    }

    public setStatistic(statistic: IStatistic): Observable<IStatistic> {
        return from(new Promise<IStatistic>((resolve) => {
            localStorage.setItem(this.statisticID, JSON.stringify(statistic));
            resolve(statistic);
        }));
    }

    public getRepeaters(): Observable<IRepeater[]> {
        return from(new Promise<IRepeater[]>((resolve) => {
            const repeaters = localStorage.getItem(this.repeatersID);
            if (repeaters) {
                resolve(JSON.parse(repeaters) as IRepeater[]);
            } else {
                resolve([])
            }
        }));
    }

    public setRepeaters(repeaters: IRepeater[]): Observable<IRepeater[]> {
        return from(new Promise<IRepeater[]>((resolve) => {
            localStorage.setItem(this.repeatersID, JSON.stringify(repeaters));
            resolve(repeaters);
        }));
    }
}
