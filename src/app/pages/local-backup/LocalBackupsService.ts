import {of} from 'rxjs';

import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {switchMap, tap} from 'rxjs/operators';
import {saveBackupFile} from './logic/saveBackupFile';

export class LocalBackupsService {

    public localBackupChannel: Channel<void, ICardsGroup[]>;
    public loadBackupChannel: Channel<string, ICardsGroup[]>;

    constructor(private storageService: getStorageService) {
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
