import {of} from 'rxjs';
import {map} from 'rxjs/operators';

import {Channel} from '../../common/Channel';

export class SpinnerService {

    public spinnerCounterChannel: Channel<number, number>;

    private spinnerCounter = 0;

    constructor() {
        this.spinnerCounterChannel = new Channel((difference: number) => of('').pipe(map(() => {
            if(this.spinnerCounter + difference >= 0) {
                this.spinnerCounter = this.spinnerCounter + difference;
            }
            return this.spinnerCounter;
        })))
    }
}
