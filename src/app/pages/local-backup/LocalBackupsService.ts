import {of} from 'rxjs';

import {localStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {switchMap, tap} from 'rxjs/operators';

class LocalBackupsService {

    public localBackupChannel: Channel<void, ICardsGroup[]>;

    constructor() {
        this.localBackupChannel = new Channel(() => of('').pipe(
            switchMap(() => this.saveFile())
        ))
    }

    loadFile = (event: any) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (readerEvent: any) => {
            const games: string = readerEvent.target.result;
        };
        reader.readAsText(file);
    };

    saveFile() {
        return localStorageService.getBackupFromStorage().pipe(
            tap((backup: ICardsGroup[]) => {
                const fileData: string = JSON.stringify(backup, null, 4);
                const blob = new Blob([fileData], {type: "octet/stream"});
                const url = window.URL.createObjectURL(blob);

                const fileBuffer = document.createElement('a');

                if (fileBuffer) {
                    fileBuffer.href = url;
                    fileBuffer.download = 'My Completed Games.txt';
                    fileBuffer.click();
                }
                window.URL.revokeObjectURL(url);
            })
        );
    }
}

export const localBackupsService = new LocalBackupsService();
