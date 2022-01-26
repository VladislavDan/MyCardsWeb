import {Routs} from '../../common/Routs';

class ToolbarService {

    public getPageLabel(path: string) {
        if(path === Routs.googleAuth.path) {
            return Routs.googleAuth.name;
        }

        if(path === Routs.googleBackups.path) {
            return Routs.googleBackups.name;
        }

        if(path === Routs.cardsGroups.path) {
            return Routs.cardsGroups.name;
        }

        if(path === Routs.cards.path) {
            return Routs.cards.name;
        }

        if(path === Routs.cardsRepeater.path) {
            return Routs.cardsRepeater.name;
        }

        if(path === Routs.localBackups.path) {
            return Routs.localBackups.name;
        }

        if(path === Routs.settings.path) {
            return Routs.settings.name;
        }

        return 'My Cards'
    }
}

export const toolbarManager = new ToolbarService();
