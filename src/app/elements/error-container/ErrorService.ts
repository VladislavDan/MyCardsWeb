import {Subject} from 'rxjs';

class ErrorService {
    public errorChannel: Subject<string>;


    constructor() {
        this.errorChannel = new Subject<string>();
    }

}

export const errorManager = new ErrorService();
