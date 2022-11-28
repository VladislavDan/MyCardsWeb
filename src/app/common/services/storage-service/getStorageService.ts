import {from, Observable} from 'rxjs';
import {ICardsGroup} from 'src/app/common/types/ICardsGroup';
import {ISettings} from 'src/app/common/types/ISettings';
import {IStoredFilters} from 'src/app/common/types/IStoredFilters';
import {defaultFilter} from 'src/app/common/defaults/defaultFilter';
import {IStatistic} from 'src/app/common/types/IStatistic';
import {defaultStatistic} from 'src/app/common/defaults/defaultStatistic';
import {defaultSettings} from 'src/app/common/defaults/defaultSettings';
import {IRepeater} from 'src/app/common/types/IRepeater';
import {IDataBaseService} from '../data-base-service/types/IDataBaseService';
import {IDependencyFunction} from 'src/MyTools/react-di/types/IDependencyFunction';
import {IStorageService} from 'src/app/common/services/storage-service/types/IStorageService';

export const getStorageService: IDependencyFunction<IStorageService> = (
    dataBaseService: IDataBaseService
) => {

    const cardsStorageID = 'cards-local-storage';
    const authTokenLocalStorageID = 'auth-token';
    const settingsID = 'settings';
    const filterID = 'filter';
    const statisticID = 'statistic';
    const repeatersID = 'repeaters';

    const getBackupFromDataBase = async () => {
        let backup = null;
        try {
            backup = await dataBaseService.get<ICardsGroup[]>(cardsStorageID);
        } catch (e) {
            console.error(e);
            return [];
        }
        if (backup) {
            return backup;
        } else {
            return [];
        }
    };

    const getBackup = (): Observable<ICardsGroup[]> => {
        return from(getBackupFromDataBase());
    };

    const setBackupToDataBase = async (cardsGroups: ICardsGroup[]): Promise<ICardsGroup[]> => {
        try {
            await dataBaseService.set(cardsStorageID, cardsGroups);
            return cardsGroups;
        } catch (e) {
            console.error(e);
            return cardsGroups;
        }
    }

    const setBackup = (cardsGroups: ICardsGroup[]): Observable<ICardsGroup[]> => {
        return from(setBackupToDataBase(cardsGroups));
    }

    const getAuthToken = (): Observable<string> => {
        return from(new Promise<string>((resolve, reject) => {
            const authToken = localStorage.getItem(authTokenLocalStorageID);
            if (authToken) {
                resolve(authToken);
            } else {
                reject('Auth token is empty')
            }
        }));
    }

    const setAuthToken = (authToken: string): Observable<string> => {
        return from(new Promise<string>((resolve) => {
            localStorage.setItem(authTokenLocalStorageID, authToken);
            resolve(authToken);
        }));
    }

    const getSettings = (): Observable<ISettings> => {
        return from(new Promise<ISettings>((resolve, reject) => {
            const settings = localStorage.getItem(settingsID);
            if (settings) {
                resolve(JSON.parse(settings) as ISettings);
            } else {
                resolve(defaultSettings)
            }
        }));
    }

    const setSettings = (settings: ISettings): Observable<ISettings> => {
        return from(new Promise<ISettings>((resolve) => {
            localStorage.setItem(settingsID, JSON.stringify(settings));
            resolve(settings);
        }));
    }

    const getFilter = (): Observable<IStoredFilters> => {
        return from(new Promise<IStoredFilters>((resolve) => {
            const settings = localStorage.getItem(filterID);
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

    const setFilter = (settings: IStoredFilters): Observable<IStoredFilters> => {
        return from(new Promise<IStoredFilters>((resolve) => {
            localStorage.setItem(filterID, JSON.stringify(settings));
            resolve(settings);
        }));
    }

    const getStatistic = (): Observable<IStatistic> => {
        return from(new Promise<IStatistic>((resolve) => {
            const statistic = localStorage.getItem(statisticID);
            if (statistic) {
                resolve(JSON.parse(statistic) as IStatistic);
            } else {
                resolve(defaultStatistic)
            }
        }));
    }

    const setStatistic = (statistic: IStatistic): Observable<IStatistic> => {
        return from(new Promise<IStatistic>((resolve) => {
            localStorage.setItem(statisticID, JSON.stringify(statistic));
            resolve(statistic);
        }));
    }

    const getRepeaters = (): Observable<IRepeater[]> => {
        return from(new Promise<IRepeater[]>((resolve) => {
            const repeaters = localStorage.getItem(repeatersID);
            if (repeaters) {
                resolve(JSON.parse(repeaters) as IRepeater[]);
            } else {
                resolve([])
            }
        }));
    }

    const setRepeaters = (repeaters: IRepeater[]): Observable<IRepeater[]> => {
        return from(new Promise<IRepeater[]>((resolve) => {
            localStorage.setItem(repeatersID, JSON.stringify(repeaters));
            resolve(repeaters);
        }));
    }

    return {
        getBackup,
        setBackup,
        getAuthToken,
        setAuthToken,
        getSettings,
        setSettings,
        getFilter,
        setFilter,
        getStatistic,
        getRepeaters,
        setRepeaters,
        setStatistic
    }
}
