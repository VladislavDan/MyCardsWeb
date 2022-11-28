import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {Dependency} from '../../../MyTools/react-di/Dependency';

export class GoogleAuthService extends Dependency {
    public loginChannel: Channel<string, string>;

    constructor(storageService: getStorageService) {
        super();
        this.loginChannel = new Channel((authToken: string) => of('').pipe(
            tap(() => {
                storageService.setAuthToken(authToken)
            })
        ));
    }
}
