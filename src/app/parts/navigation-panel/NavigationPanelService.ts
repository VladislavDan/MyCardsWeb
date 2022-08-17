import {of} from 'rxjs';

import {Channel} from '../../../MyTools/channel-conception/Channel';
import {IEmpty} from "../../../MyTools/channel-conception/defaults/IEmpty";
import {empty} from "../../../MyTools/channel-conception/defaults/empty";

export class NavigationPanelService {

    public navigationPanelOpenChannel: Channel<IEmpty, IEmpty>;

    constructor() {
        this.navigationPanelOpenChannel = new Channel(() => of(empty))
    }
}
