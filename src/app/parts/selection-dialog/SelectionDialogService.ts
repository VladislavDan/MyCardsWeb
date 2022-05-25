import {of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {Channel} from '../../../MyTools/channel-conception/Channel';
import {SelectionDialogContainerState} from "./types/SelectionDialogContainerState";

export class SelectionDialogService {

    public openDialogChannel = new Channel<SelectionDialogContainerState, SelectionDialogContainerState>(
        (state: SelectionDialogContainerState) => of(state).pipe(tap((state) => {
            if(!state.isOpen) {
                this.selectionChannel.unsubscribe();
            }
        }))
    );

    public selectionChannel = new Channel<number, number>((value: number) => of(value));
}

