import {defer, from, mergeMap, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {IGoogleDriveFile} from '../../common/types/IGoogleDriveFile';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {formatCreatedDate} from './logic/formatCreatedDate';
import {getBackupFolder} from './logic/getBackupFolder';
import {getBackupFiles} from './logic/getBackupFiles';
import {loadBackupFile} from './logic/loadBackupFile';
import {createBackupFolder} from './logic/createBackupFolder';
import {createEmptyBackupFile} from './logic/createEmptyBackupFile';
import {createBackupName} from './logic/createBackupName';
import {uploadBackupFile} from './logic/uploadBackupFile';
import {deleteBackupFile} from './logic/deleteBackupFile';
import {IEmpty} from '../../../MyTools/channel-conception/defaults/IEmpty';

export class GoogleBackupsService {

    public backupsNameLoadChannel: Channel<IEmpty, IGoogleDriveFile[]>;
    public backupLoadChannel: Channel<string, ICardsGroup[]>;
    public backupUploadChannel: Channel<void, string>;
    public backupDeleteChannel: Channel<string, string>;

    constructor(private storageService: getStorageService) {

        this.backupsNameLoadChannel = new Channel(() => storageService.getAuthToken().pipe(
            mergeMap(
                (authToken: string) => of(authToken).pipe(
                    switchMap(() => from(getBackupFolder(authToken))),
                    switchMap(
                        (folder: IGoogleDriveFile | null) => from(getBackupFiles(authToken, folder))
                    ),
                    map((googleDriveFiles: IGoogleDriveFile[] | null) => formatCreatedDate(googleDriveFiles))
                )
            )
        ));

        this.backupLoadChannel = new Channel(
            (backupID: string) => storageService.getAuthToken().pipe(
                switchMap(
                    (authToken) => from(loadBackupFile(authToken, backupID))
                ),
                tap((cards: ICardsGroup[]) => {
                    storageService.setBackup(cards);
                })
            )
        );

        this.backupUploadChannel = new Channel(
            () => storageService.getAuthToken().pipe(
                mergeMap((authToken: string) => of(authToken).pipe(
                        switchMap(() => from(getBackupFolder(authToken))),
                        mergeMap((folder: IGoogleDriveFile | null) => {
                            return defer(() => {
                                return folder ? of(folder.id) : from(createBackupFolder(authToken))
                            })
                        }),
                        mergeMap((folderId: string) => {
                            return storageService.getBackup().pipe(
                                map(
                                    (cardsGroups) => createBackupName(cardsGroups)
                                ),
                                switchMap((name: string) => {
                                    return from(createEmptyBackupFile(
                                        authToken,
                                        folderId,
                                        name
                                    ));
                                })
                            )
                        }),
                        switchMap((fileId: string) => {
                            return storageService.getBackup().pipe(
                                switchMap((cardsGroups) => {
                                    return uploadBackupFile(
                                        authToken,
                                        fileId,
                                        cardsGroups
                                    )
                                })
                            )
                        })
                    )
                )
            )
        );

        this.backupDeleteChannel = new Channel((fileID: string) => storageService.getAuthToken().pipe(
            switchMap((authToken) => deleteBackupFile(authToken, fileID))
        ));
    }
}
