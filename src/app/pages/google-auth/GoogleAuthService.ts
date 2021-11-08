import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {localStorageService} from '../../common/services/LocalStoragService';
import {Channel} from '../../common/Channel';

export class GoogleAuthService {
    public loginChannel: Channel<string, string>;


    constructor() {

        this.loginChannel = new Channel((authToken: string) => of('').pipe(
            tap(() => {
                localStorageService.setAuthToken(authToken)
            })
        ));
    }
}
