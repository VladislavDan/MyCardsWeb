import {Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

import {localStorageManager} from '../../common/managers/LocalStoragService';
import {errorManager} from '../../elements/error-container/ErrorService';

class GoogleAuthManager {
    public loginChannel: Subject<string>;


    constructor() {

        this.loginChannel = new Subject<string>().pipe(
            tap((authToken: string) => {
                localStorageManager.setAuthToken(authToken)
            }),
            catchError((error:Error) => {
                errorManager.errorChannel.next('Cannot connect to Google drive');
                return throwError(error);
            })
        ) as Subject<string>;
    }

}

export const googleAuthManager = new GoogleAuthManager();
