import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Channel} from '../../../MyTools/channel-conception/Channel';
import {ConfirmDialogContainerState} from "./types/ConfirmDialogContainerState";

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

