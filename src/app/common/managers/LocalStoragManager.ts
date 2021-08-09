import {from, Observable, Subject} from 'rxjs';
import {Backup} from '../../types/Backup';

class LocalStorageManager {

    public storageChangeChannel: Subject<Backup> = new Subject();

    private cardsLocalStorageID = 'cards-local-storage';
    private authTokenLocalStorageID = 'auth-token';

    public getBackupFromStorage() : Observable<Backup> {
        return from(new Promise<Backup>((resolve) => {
            const backup = localStorage.getItem(this.cardsLocalStorageID);
            if(backup) {
                resolve(JSON.parse(backup));
            } else {
                resolve({
                    cards: [],
                    cardsGroups: []
                })
            }
        }));
    }

    public setBackupToStorage(backup: Backup): Observable<Backup> {
        return from(new Promise<Backup>((resolve) => {
            this.storageChangeChannel.next(backup);
            localStorage.setItem(this.cardsLocalStorageID, JSON.stringify(backup, null, 4));
            resolve(backup);
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

export const localStorageManager = new LocalStorageManager();
