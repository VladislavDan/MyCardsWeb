import {from, Observable} from 'rxjs';
import {ICardsGroup} from '../../types/ICardsGroup';
import {DataBaseService} from '../../data-base/DataBaseService';

export class StorageService {

    private cardsStorageID = 'cards-local-storage';
    private authTokenLocalStorageID = 'auth-token';

    constructor(private dataBaseService: DataBaseService) {
    }

    public getBackupFromStorage = () : Observable<ICardsGroup[]> => {
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

    public setBackupToStorage(cardsGroups: ICardsGroup[]): Observable<ICardsGroup[]> {
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
}
