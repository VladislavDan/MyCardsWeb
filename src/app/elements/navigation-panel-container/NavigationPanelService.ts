import {of} from 'rxjs';

import {Channel} from '../../common/Channel';

class NavigationPanelService {

    public navigationPanelOpenChannel: Channel<string, string>;

    constructor() {
        this.navigationPanelOpenChannel = new Channel<string, string>((value: string) => of(value))
    }
}

export const navigationPanelService = new NavigationPanelService();
