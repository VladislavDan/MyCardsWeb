import {IBackupFile} from './BackupFile'

export interface IGoogleDriveBackup {
    files: IBackupFile[]
    incompleteSearch: boolean;
    kind: string;
    nextPageToken: string;
}
