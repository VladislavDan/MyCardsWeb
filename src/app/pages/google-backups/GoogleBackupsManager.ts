import {Subject, Observable, throwError, of} from 'rxjs';
import {
    catchError,
    map,
    switchMap,
    tap
} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

import {localStorageManager} from '../../common/managers/LocalStoragManager';
import {spinnerManager} from '../../elements/spinner-container/SpinnerManager';
import {errorManager} from '../../elements/error-container/ErrorManager';
import {Backup} from '../../types/Backup';
import {GoogleDriveFile} from '../../types/GoogleDriveFile';

class GoogleBackupsManager {

    public backupsNameLoadChannel;
    public backupLoadChannel;
    public backupUploadChannel: any;
    public backupDeleteChannel: any;

    private backupFileName = 'my-cards.json';
    private backupFolderName = 'my-cards';
    private googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
    private googleDriveUploadAPI = "https://www.googleapis.com/upload/drive/v3/files/";
    private searchFilesURI = this.googleDriveFilesAPI + '?fields=files(id,createdTime)&q=name%20contains%20';
    private searchFolderURI = this.googleDriveFilesAPI + '?q=name%20contains%20';
    private getFilesAdditionalPartURI = '?alt=media';
    private googleDriveFolderType = 'application/vnd.google-apps.folder';

    constructor() {

        this.backupsNameLoadChannel = new Subject<any>().pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap(() => localStorageManager.getAuthToken()),
            switchMap(
                (authToken: string): Observable<GoogleDriveFile[]> => this.getBackupFiles(authToken)
            ),
            map((googleDriveFiles: GoogleDriveFile[]) => {
                return googleDriveFiles.map((googleDriveFile: GoogleDriveFile) => {
                    return {...googleDriveFile, createdTime: googleDriveFile.createdTime.slice(0, 10)};
                });
            }),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1)),
            catchError((error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot load backups files names');
                return throwError(error);
            })
        ) as Subject<any>;

        this.backupLoadChannel = new Subject<any>().pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap((backupID: string): Observable<any> => this.loadBackupFile(backupID)),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1)),
            catchError((error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot load backup file');
                return throwError(error);
            })
        ) as Subject<any>;

        this.backupUploadChannel = new Subject().pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap(() => localStorageManager.getAuthToken()),
            switchMap((authToken: string) => this.createNewBackup(authToken)),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1)),
            catchError((error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot upload backup files');
                return throwError(error);
            })
        );

        this.backupDeleteChannel = new Subject<any>().pipe(
            tap(() => spinnerManager.spinnerCounterChannel.next(1)),
            switchMap((fileID: string) => this.deleteBackupFile(fileID)),
            tap(() => {
                this.backupsNameLoadChannel.next('')
            }),
            tap(() => spinnerManager.spinnerCounterChannel.next(-1)),
            catchError((error: Error) => {
                spinnerManager.spinnerCounterChannel.next(-1);
                errorManager.errorChannel.next('Cannot delete backup file');
                return throwError(error);
            })
        );
    }

    public createNewBackup(authToken: string) {
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
                switchMap((folderId) => {
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
                    return this.backupsNameLoadChannel.next('');
                })
            );
    }

    public getBackupFiles(token: string): Observable<GoogleDriveFile[]> {
        return ajax(
            {
                url: `${this.searchFilesURI}'${this.backupFileName}'`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET'
            }
        ).pipe(
            map((result: any) => {
                return result.response.files;
            })
        ) as Observable<GoogleDriveFile[]>;
    }

    public loadBackupFile(fileId: string): Observable<any> {
        return of('').pipe(
            switchMap(() => localStorageManager.getAuthToken()),
            switchMap((authToken: string) => ajax(
                {
                    url: this.googleDriveFilesAPI + fileId + this.getFilesAdditionalPartURI,
                    headers: {
                        "Authorization": "Bearer " + authToken
                    },
                    method: "GET"
                }
            )),
            tap((result: any) => {
                localStorageManager.setBackupToStorage(result.response)
            })
        );
    }


    public getBackupFolder(token: string): Observable<any> {
        return ajax(
            {
                url: `${this.searchFolderURI}'${this.backupFolderName}'`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: 'GET'
            }
        ).pipe(
            map((result: any) => {
                return result.response.files;
            })
        );
    }

    public deleteBackupFile(fileId: string): Observable<any> {
        return of('').pipe(
            switchMap(() => localStorageManager.getAuthToken()),
            switchMap((authToken: string) => ajax(
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

    public createNewBackupFile(token: string, id: string): Observable<any> {
        return ajax(
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
            map((result: any) => {
                return result.response.id;
            })
        );
    }

    public createBackupFolder(token: string): Observable<any> {
        return ajax(
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
            map((result: any) => {
                return result.response.id;
            })
        );
    }

    public uploadBackupFile(token: string, fileId: string): Observable<any> {
        return of('').pipe(
            switchMap(() => localStorageManager.getBackupFromStorage()),
            switchMap((backup: Backup) => ajax(
                {
                    url: this.googleDriveUploadAPI + fileId,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(backup, null, 4),
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

export const googleBackupsManager = new GoogleBackupsManager();
