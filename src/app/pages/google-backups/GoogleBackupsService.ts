import {from, mergeMap, Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {ajax, AjaxResponse} from 'rxjs/ajax';

import {StorageService} from '../../common/services/StorageService';
import {IGoogleDriveFile} from '../../common/types/IGoogleDriveFile';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {Channel} from '../../../MyTools/channel-conception/Channel';
import {formatCreatedDate} from './logic/formatCreatedDate';
import {getBackupFolder} from "./logic/getBackupFolder";

export class GoogleBackupsService {

    public backupsNameLoadChannel: Channel<string, IGoogleDriveFile[]>;
    public backupLoadChannel: Channel<string, ICardsGroup[]>;
    public backupUploadChannel: Channel<void, string>;
    public backupDeleteChannel: Channel<string, AjaxResponse<string>>;

    private backupFileName = 'my-cards.json';
    private backupFolderName = 'my-cards';
    private googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
    private googleDriveUploadAPI = "https://www.googleapis.com/upload/drive/v3/files/";
    private getFilesAdditionalPartURI = '?alt=media';

    constructor(private storageService: StorageService) {

        this.backupsNameLoadChannel = new Channel(() => storageService.getAuthToken().pipe(
            mergeMap((authToken: string) => of(authToken).pipe(
                switchMap(() => from(getBackupFolder(authToken))),
                switchMap(
                    (folder: IGoogleDriveFile | null) => this.getBackupFiles(authToken, folder)
                ),
                map((googleDriveFiles: IGoogleDriveFile[]) => formatCreatedDate(googleDriveFiles))
            ))
        ));

        this.backupLoadChannel = new Channel((backupID: string) => of('').pipe(
            switchMap((): Observable<ICardsGroup[]> => this.loadBackupFile(backupID))
        ));

        this.backupUploadChannel = new Channel(() => of('').pipe(
            switchMap(() => storageService.getAuthToken()),
            switchMap((authToken: string) => this.createNewBackup(authToken))
        ));

        this.backupDeleteChannel = new Channel((fileID: string) => of("").pipe(
            switchMap(() => this.deleteBackupFile(fileID)),
            tap(() => {
                this.backupsNameLoadChannel.next('')
            })
        ));
    }

    public createNewBackup(authToken: string): Observable<string> {
        return from(getBackupFolder(authToken))
            .pipe(
                switchMap((folder: IGoogleDriveFile | null) => {
                    if (folder) {
                        return of(folder.id);
                    } else {
                        return this.createBackupFolder(authToken);
                    }
                }),
                switchMap((folderId: string) => {
                    return this.createNewBackupFile(
                        authToken,
                        folderId
                    );
                }),
                switchMap((fileId: string) => {
                    return this.uploadBackupFile(
                        authToken,
                        fileId
                    )
                }),
                tap(() => {
                    this.backupsNameLoadChannel.next('');
                })
            );
    }

    public getBackupFiles(token: string, folder: IGoogleDriveFile | null): Observable<IGoogleDriveFile[]> {
        return ajax<{ files: IGoogleDriveFile[] }>(
            {
                url: `${this.googleDriveFilesAPI}?q="${folder ? folder.id : -1}"+in+parents&fields=files(id,createdTime,name)`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET'
            }
        ).pipe(
            map((result: AjaxResponse<{ files: IGoogleDriveFile[] }>) => {
                console.log(result)
                return result.response.files;
            })
        );
    }

    public loadBackupFile(fileId: string): Observable<ICardsGroup[]> {
        return this.storageService.getAuthToken().pipe(
            switchMap((authToken: string) => ajax<ICardsGroup[]>(
                {
                    url: this.googleDriveFilesAPI + fileId + this.getFilesAdditionalPartURI,
                    headers: {
                        "Authorization": "Bearer " + authToken
                    },
                    method: "GET"
                }
            )),
            map((result: AjaxResponse<ICardsGroup[]>) => {
                this.storageService.setBackup(result.response);
                return result.response;
            })
        );
    }

    public deleteBackupFile(fileId: string): Observable<AjaxResponse<string>> {
        return this.storageService.getAuthToken().pipe(
            switchMap((authToken: string) => ajax<string>(
                {
                    url: this.googleDriveFilesAPI + fileId,
                    headers: {
                        'Authorization': 'Bearer ' + authToken,
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE'
                }
            ))
        );
    }

    public createNewBackupFile(token: string, id: string): Observable<string> {
        return ajax<{ id: string }>(
            {
                url: this.googleDriveFilesAPI,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: {
                    parents: [id],
                    name: this.backupFileName
                },
                method: 'POST'
            }
        ).pipe(
            map((result: AjaxResponse<{ id: string }>) => {
                return result.response.id;
            })
        );
    }

    public createBackupFolder(token: string): Observable<string> {
        return ajax<{ id: string }>(
            {
                url: this.googleDriveFilesAPI,
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: {
                    name: this.backupFolderName,
                    mimeType: 'application/vnd.google-apps.folder'
                },
                method: 'POST'
            }
        ).pipe(
            map((result: AjaxResponse<{ id: string }>) => {
                return result.response.id;
            })
        );
    }

    public uploadBackupFile(token: string, fileId: string): Observable<string> {
        return this.storageService.getBackup().pipe(
            switchMap((cardsGroups: ICardsGroup[]) => ajax(
                {
                    url: this.googleDriveUploadAPI + fileId,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(cardsGroups, null, 4),
                    responseType: 'text',
                    method: 'PATCH'
                }
            ).pipe(
                map(() => {
                    return fileId;
                })
            ))
        )
    }

}
