import {Routs} from '../../common/Routs';

class ToolbarManager {

    public getPageLabel(path: string) {
        if(path === Routs.googleAuth.path) {
            return Routs.googleAuth.name;
        }

        if(path === Routs.googleBackups.path) {
            return Routs.googleBackups.name;
        }

        return 'My Cards'
    }
}

export const toolbarManager = new ToolbarManager();
