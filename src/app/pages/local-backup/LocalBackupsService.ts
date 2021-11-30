import {of} from 'rxjs';

import {LocalStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {switchMap, tap} from 'rxjs/operators';

export class LocalBackupsService {

    public localBackupChannel: Channel<void, ICardsGroup[]>;
    public loadBackupChannel: Channel<string, ICardsGroup[]>;

    constructor(private localStorageService: LocalStorageService) {
        this.localBackupChannel = new Channel(() => of('').pipe(
            switchMap(() => this.saveFile())
        ));

        this.loadBackupChannel = new Channel((backupFile: string) => of('').pipe(
            switchMap(() => {
                return this.localStorageService.setBackupToStorage(JSON.parse(backupFile));
            })
        ));
    }

    saveFile() {
        return this.localStorageService.getBackupFromStorage().pipe(
            tap((backup: ICardsGroup[]) => {
                const fileData: string = JSON.stringify(backup, null, 4);
                const blob = new Blob([fileData], {type: "octet/stream"});
                const url = window.URL.createObjectURL(blob);

                const fileBuffer = document.createElement('a');

                if (fileBuffer) {
                    fileBuffer.href = url;
                    fileBuffer.download = 'My Cards.txt';
                    fileBuffer.click();
                }
                window.URL.revokeObjectURL(url);
            })
        );
    }
}
