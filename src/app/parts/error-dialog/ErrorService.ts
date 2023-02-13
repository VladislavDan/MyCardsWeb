import {of} from 'rxjs';

import {Channel} from '../../../MyTools/channel-conception/Channel';

export class ErrorService {
    public errorChannel: Channel<string, string>;


    constructor() {
        this.errorChannel = new Channel<string, string>((error: string)=> of(error));
    }

}
