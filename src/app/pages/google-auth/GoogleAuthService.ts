import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {Channel} from '../../common/Channel';

export class GoogleAuthService {
    public loginChannel: Channel<string, string>;


    constructor(storageService: StorageService) {

        this.loginChannel = new Channel((authToken: string) => of('').pipe(
            tap(() => {
                storageService.setAuthToken(authToken)
            })
        ));
    }
}
