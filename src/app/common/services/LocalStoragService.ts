import {from, Observable} from 'rxjs';
import {ICardsGroup} from '../../types/ICardsGroup';

export class LocalStorageService {

    private cardsLocalStorageID = 'cards-local-storage';
    private authTokenLocalStorageID = 'auth-token';

    public getBackupFromStorage() : Observable<ICardsGroup[]> {
        return from(new Promise<ICardsGroup[]>((resolve) => {
            const backup = localStorage.getItem(this.cardsLocalStorageID);
            if(backup) {
                resolve(JSON.parse(backup));
            } else {
                resolve([])
            }
        }));
    }

    public setBackupToStorage(cardsGroups: ICardsGroup[]): Observable<ICardsGroup[]> {
        return from(new Promise<ICardsGroup[]>((resolve) => {
            localStorage.setItem(this.cardsLocalStorageID, JSON.stringify(cardsGroups, null, 4));
            resolve(cardsGroups);
        }));
    }

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
