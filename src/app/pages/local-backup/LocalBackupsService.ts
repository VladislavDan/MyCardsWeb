import {of} from 'rxjs';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {switchMap, tap} from 'rxjs/operators';
import {saveBackupFile} from './logic/saveBackupFile';

export class LocalBackupsService {

    public localBackupChannel: Channel<void, ICardsGroup[]>;
    public loadBackupChannel: Channel<string, ICardsGroup[]>;

    constructor(private storageService: StorageService) {
        this.localBackupChannel = new Channel(() => this.storageService.getBackup().pipe(
            tap((backup: ICardsGroup[]) => saveBackupFile(backup))
        ));

        this.loadBackupChannel = new Channel((backupFile: string) => of('').pipe(
            switchMap(() => {
                return this.storageService.setBackup(JSON.parse(backupFile));
            })
        ));
    }
}
