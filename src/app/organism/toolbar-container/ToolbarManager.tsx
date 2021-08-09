import {Routs} from '../../common/Routs';

class ToolbarManager {

    public getPageLabel(path: string) {
        if(path === Routs.googleAuth.path) {
            return Routs.googleAuth.name;
        }

        return 'My Cards'
    }
}

export const toolbarManager = new ToolbarManager();
