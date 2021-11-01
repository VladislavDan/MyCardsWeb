import {of} from 'rxjs';

import {ConfirmDialogContainerState} from './ConfirmDialogContainer';
import {Channel} from '../../common/Channel';

class ConfirmDialogService {

    public openDialogChannel = new Channel<ConfirmDialogContainerState, ConfirmDialogContainerState>(
        (state: ConfirmDialogContainerState) => of(state)
    );

    public confirmationChannel = new Channel<boolean, boolean>((value: boolean) => of(value));
}

export const confirmDialogService = new ConfirmDialogService();

