export interface IBackupsListItemComponent {
    backupName: string;
    backupID: string;
    onLoad: (backupID: string) => void;
    onDelete: (backupID: string) => void;
}