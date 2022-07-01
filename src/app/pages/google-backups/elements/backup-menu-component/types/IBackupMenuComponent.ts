export interface IBackupMenuComponent {
    backupID: string;
    onLoad: (backupID: string) => void;
    onDelete: (backupID: string) => void;
}