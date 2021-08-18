import {Subject} from 'rxjs';

import {ConfirmDialogContainerState} from './ConfirmDialogContainer';

class ConfirmDialogManager {
    public openDialogChannel = new Subject<ConfirmDialogContainerState>();
    public confirmationChannel = new Subject<boolean>();

    constructor() {
    }

}

export const confirmDialogManager = new ConfirmDialogManager();

