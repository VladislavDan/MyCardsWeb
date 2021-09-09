import {from, Observable, Subject} from 'rxjs';
import {CardsGroup} from '../../types/CardsGroup';

class LocalStorageManager {

    public storageChangeChannel: Subject<CardsGroup[]> = new Subject();

    private cardsLocalStorageID = 'cards-local-storage';
    private authTokenLocalStorageID = 'auth-token';

    public getBackupFromStorage() : Observable<CardsGroup[]> {
        return from(new Promise<CardsGroup[]>((resolve) => {
            const backup = localStorage.getItem(this.cardsLocalStorageID);
            if(backup) {
                resolve(JSON.parse(backup));
            } else {
                resolve([])
            }
        }));
    }

    public setBackupToStorage(cardsGroups: CardsGroup[]): Observable<CardsGroup[]> {
        return from(new Promise<CardsGroup[]>((resolve) => {
            this.storageChangeChannel.next(cardsGroups);
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

export const localStorageService = new LocalStorageManager();
