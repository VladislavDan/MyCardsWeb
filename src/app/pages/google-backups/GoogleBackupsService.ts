import {Observable, of} from 'rxjs';
import {
    map,
    switchMap,
    tap
} from 'rxjs/operators';
import {ajax, AjaxResponse} from 'rxjs/ajax';

import {localStorageService} from '../../common/services/LocalStoragService';
import {GoogleDriveFile} from '../../types/GoogleDriveFile';
import {CardsGroup} from '../../types/CardsGroup';
import {Channel} from '../../common/Channel';
import {spinnerManager} from '../../../App';

class GoogleBackupsService {

    public backupsNameLoadChannel: Channel<string, GoogleDriveFile[]>;
    public backupLoadChannel: Channel<string, CardsGroup[]>;
    public backupUploadChannel: Channel<string, string>;
    public backupDeleteChannel: Channel<string, AjaxResponse<string>>;

    private backupFileName = 'my-cards.json';
    private backupFolderName = 'my-cards';
    private googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
    private googleDriveUploadAPI = "https://www.googleapis.com/upload/drive/v3/files/";
    private searchFilesURI = this.googleDriveFilesAPI + '?fields=files(id,createdTime)&q=name%20contains%20';
    private searchFolderURI = this.googleDriveFilesAPI + '?q=name%20contains%20';
    private getFilesAdditionalPartURI = '?alt=media';
    private googleDriveFolderType = 'application/vnd.google-apps.folder';

    constructor() {

        this.backupsNameLoadChannel = new Channel(() => of('').pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap(() => localStorageService.getAuthToken()),
            switchMap(
                (authToken: string): Observable<GoogleDriveFile[]> => this.getBackupFiles(authToken)
            ),
            map((googleDriveFiles: GoogleDriveFile[]) => {
                return googleDriveFiles.map((googleDriveFile: GoogleDriveFile) => {
                    return {...googleDriveFile, createdTime: googleDriveFile.createdTime.slice(0, 10)};
                });
            }),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1))
        ));

        this.backupLoadChannel = new Channel((backupID: string) => of('').pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap((): Observable<CardsGroup[]> => this.loadBackupFile(backupID)),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1)),
        ));

        this.backupUploadChannel = new Channel(() => of('').pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap(() => localStorageService.getAuthToken()),
            switchMap((authToken: string) => this.createNewBackup(authToken)),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1))
        ));

        this.backupDeleteChannel = new Channel(() => of("").pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap((fileID: string) => this.deleteBackupFile(fileID)),
            tap(() => {
                this.backupsNameLoadChannel.next('')
            }),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1))
        ));
    }

    public createNewBackup(authToken: string): Observable<string> {
        return this.getBackupFolder(authToken)
            .pipe(
                switchMap((folders: GoogleDriveFile[]) => {
                    if (folders) {
                        let foundedFolder = folders.find((file) => {
                            return file.mimeType === this.googleDriveFolderType
                        });
                        if (foundedFolder) {
                            return of(foundedFolder.id);
                        } else {
                            return this.createBackupFolder(authToken);
                        }
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

    public getBackupFiles(token: string): Observable<GoogleDriveFile[]> {
        return ajax<{files: GoogleDriveFile[]}>(
            {
                url: `${this.searchFilesURI}'${this.backupFileName}'`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET'
            }
        ).pipe(
            map((result: AjaxResponse<{files: GoogleDriveFile[]}>) => {
                return result.response.files;
            })
        );
    }

    public loadBackupFile(fileId: string): Observable<CardsGroup[]> {
        return of('').pipe(
            switchMap(() => localStorageService.getAuthToken()),
            switchMap((authToken: string) => ajax<CardsGroup[]>(
                {
                    url: this.googleDriveFilesAPI + fileId + this.getFilesAdditionalPartURI,
                    headers: {
                        "Authorization": "Bearer " + authToken
                    },
                    method: "GET"
                }
            )),
            map((result: AjaxResponse<CardsGroup[]>) => {
                localStorageService.setBackupToStorage(result.response);
                return result.response;
            })
        );
    }


    public getBackupFolder(token: string): Observable<GoogleDriveFile[]> {
        return ajax<{files:GoogleDriveFile[]}>(
            {
                url: `${this.searchFolderURI}'${this.backupFolderName}'`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET'
            }
        ).pipe(
            map((result: AjaxResponse<{files:GoogleDriveFile[]}>) => {
                return result.response.files;
            })
        );
    }

    public deleteBackupFile(fileId: string): Observable<AjaxResponse<string>> {
        return of('').pipe(
            switchMap(() => localStorageService.getAuthToken()),
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
        return ajax<{id:string}>(
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
            map((result: AjaxResponse<{id:string}>) => {
                return result.response.id;
            })
        );
    }

    public createBackupFolder(token: string): Observable<string> {
        return ajax<{id:string}>(
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
            map((result: AjaxResponse<{id:string}>) => {
                return result.response.id;
            })
        );
    }

    public uploadBackupFile(token: string, fileId: string): Observable<string> {
        return of('').pipe(
            switchMap(() => localStorageService.getBackupFromStorage()),
            switchMap((cardsGroups: CardsGroup[]) => ajax(
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

export const googleBackupsManager = new GoogleBackupsService();
