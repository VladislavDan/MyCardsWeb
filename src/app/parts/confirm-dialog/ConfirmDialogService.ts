import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {ConfirmDialogContainerState} from './ConfirmDialogContainer';
import {Channel} from '../../common/Channel';

export class ConfirmDialogService {

    public openDialogChannel = new Channel<ConfirmDialogContainerState, ConfirmDialogContainerState>(
        (state: ConfirmDialogContainerState) => of(state).pipe(tap((state) => {
            if(!state.isOpen) {
                this.confirmationChannel.unsubscribe();
            }
        }))
    );

    public confirmationChannel = new Channel<boolean, boolean>((value: boolean) => of(value));
}

