import {IGoogleDriveFile} from "../../../common/types/IGoogleDriveFile";

export interface IBackupsListComponent {
    backupsFiles: IGoogleDriveFile[];
    onLoad: (backupID: string) => void;
    onCreate: () => void;
    onDelete: (backupID: string) => void;
}