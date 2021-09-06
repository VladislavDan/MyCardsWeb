import {Subject} from 'rxjs';

import {ConfirmDialogContainerState} from './ConfirmDialogContainer';

class ConfirmDialogService {
    public openDialogChannel = new Subject<ConfirmDialogContainerState>();
    public confirmationChannel = new Subject<boolean>();

    constructor() {
    }

}

export const confirmDialogManager = new ConfirmDialogService();

