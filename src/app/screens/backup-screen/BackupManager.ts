import GoogleSignIn from "react-native-google-sign-in"
import GDrive from "react-native-google-drive-api-wrapper"
import {from, Subject} from 'rxjs'
import {BaseManager} from '../base-screen/BaseManager'
import {switchMap, tap} from 'rxjs/operators'
import {IGoogleSignInSuccess} from '../../types/screens/backup-screen/GoogleSignInSuccess'
import {ActionTypes, APP_STORAGE_KEY, BACKUP_FILE_NAME, BACKUP_FOLDER_NAME} from '../../common/Constants'
import {IGoogleDriveBackup} from '../../types/screens/backup-screen/GoogleDriveBackup'
import {IBackupFile} from '../../types/screens/backup-screen/BackupFile'
import {MMKV} from 'react-native-mmkv'

export class BackupManager implements BaseManager {

    public clickBackupButtonChannel: Subject<void> = new Subject()

    public resultChannel: Subject<IGoogleSignInSuccess> = new Subject()

    public listOfFilesChannel: Subject<IBackupFile[]> = new Subject()

    public errorChannel: Subject<any> = new Subject()

    public deleteBackupChannel: Subject<String> = new Subject()

    public loadBackupChannel: Subject<String> = new Subject()

    public clickCreateBackupButtonChannel: Subject<void> = new Subject()

    constructor() {
        this.clickBackupButtonChannel.pipe(
            tap(() => {
                GoogleSignIn.signOut()
                GoogleSignIn.disconnect()
                GoogleSignIn.configure({
                    clientID: "46420944324-fiulknujbrmqigmmcs71b2srecgqtgrh.apps.googleusercontent.com",
                    scopes: ["https://www.googleapis.com/auth/drive"]
                })
            }),
            switchMap(() => from(GoogleSignIn.signInPromise())),
            tap((result: IGoogleSignInSuccess) => {
                GDrive.setAccessToken(result.accessToken)
                GDrive.init()
                this.resultChannel.next(result)
            }),
            switchMap(() => from(GDrive.files.list({q: "name contains '" + BACKUP_FILE_NAME + "'"}).then((result) => result.json()))),
            tap((result: IGoogleDriveBackup) => {
                this.listOfFilesChannel.next(result.files)
            })
        ).subscribe(
            () => {

            },
            (error) => {
                this.errorChannel.next(error)
            }
        );

        this.deleteBackupChannel.pipe(
            switchMap((fileId) => from(GDrive.files.delete(fileId))),
            switchMap(() => from(GDrive.files.list({q: "name contains '" + BACKUP_FILE_NAME + "'"}).then((result) => result.json()))),
            tap((result: IGoogleDriveBackup) => {
                this.listOfFilesChannel.next(result.files)
            })
        ).subscribe(
            () => {

            },
            (error) => {
                this.errorChannel.next(error)
            }
        )

        this.loadBackupChannel.pipe(
            switchMap((fileId) => from(GDrive.files.get(fileId, {'alt': 'media'}).then((result) => result.json()))),
            tap((result: string) => {
                MMKV.set(APP_STORAGE_KEY, JSON.stringify(result))
            })
        ).subscribe(
            () => {

            },
            (error) => {
                this.errorChannel.next(error)
            }
        )

        this.clickCreateBackupButtonChannel.pipe(
            switchMap(() => from(GDrive.files.safeCreateFolder({name: BACKUP_FOLDER_NAME, parents: ["root"]}))),
            switchMap((result) => from(GDrive.files.createFileMultipart(
                MMKV.getString(APP_STORAGE_KEY),
                "application/json", {
                    parents: [result],
                    name: new Date().toISOString() + " " + BACKUP_FILE_NAME
                }))),
            switchMap(() => from(GDrive.files.list({q: "name contains '" + BACKUP_FILE_NAME + "'"}).then((result) => result.json()))),
            tap((result: IGoogleDriveBackup) => {
                this.listOfFilesChannel.next(result.files);
            })
        ).subscribe(
            () => {

            },
            (error) => {
                this.errorChannel.next(error)
            }
        )
    }

    public destroy() {
        this.clickBackupButtonChannel.unsubscribe()
        this.resultChannel.unsubscribe()
        this.listOfFilesChannel.unsubscribe()
        this.errorChannel.unsubscribe()
        this.deleteBackupChannel.unsubscribe()
        this.loadBackupChannel.unsubscribe()
        this.clickCreateBackupButtonChannel.unsubscribe()
    }
}
