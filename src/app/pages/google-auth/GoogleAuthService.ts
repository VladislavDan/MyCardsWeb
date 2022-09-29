import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {Dependency} from "../../../MyTools/react-di/Dependency";

export class GoogleAuthService extends Dependency {
    public loginChannel: Channel<string, string>;

    constructor(storageService: StorageService) {
        super();
        this.loginChannel = new Channel((authToken: string) => of('').pipe(
            tap(() => {
                storageService.setAuthToken(authToken)
            })
        ));
    }
}
