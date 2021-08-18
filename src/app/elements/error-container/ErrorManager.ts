import {Subject} from 'rxjs';

class ErrorManager {
    public errorChannel: Subject<string>;


    constructor() {
        this.errorChannel = new Subject<string>();
    }

}

export const errorManager = new ErrorManager();
