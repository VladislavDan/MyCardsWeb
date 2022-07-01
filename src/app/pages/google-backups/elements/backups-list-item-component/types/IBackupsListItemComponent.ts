export interface IBackupsListItemComponent {
    backupName: string;
    backupDate: string;
    backupID: string;
    onLoad: (backupID: string) => void;
    onDelete: (backupID: string) => void;
}