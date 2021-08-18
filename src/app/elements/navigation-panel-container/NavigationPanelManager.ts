import {Subject} from 'rxjs';

class NavigationPanelManager {

    public navigationPanelOpenChannel: Subject<void>;

    constructor() {
        this.navigationPanelOpenChannel = new Subject<void>()
    }
}

export const navigationPanelManager = new NavigationPanelManager();
